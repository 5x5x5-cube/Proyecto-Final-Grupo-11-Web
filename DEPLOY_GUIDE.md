# Guía de Despliegue — Web Client

## Arquitectura

```
Browser → CloudFront (HTTPS)
              ├── /*          → S3 (static files)
              └── /api/v1/*   → ELB → gateway-service → backend services
```

CloudFront sirve tanto el frontend estático como proxea las requests de API al backend. Esto permite HTTPS sin dominio personalizado y evita problemas de mixed content.

---

## Prerrequisitos

1. **AWS CLI v2** configurado con perfil `maestria`
2. **Terraform** >= 1.0
3. **Node.js** >= 20 con `yarn`
4. **Backend desplegado** — el ELB del backend debe estar activo (ver `DEPLOY_GUIDE.md` del backend)

---

## Crear infraestructura desde cero

### Paso 1: Obtener el hostname del ELB del backend

```bash
LB=$(AWS_PROFILE=maestria kubectl get ingress api-gateway -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
echo $LB
```

### Paso 2: Crear infraestructura (~5 min)

El state se guarda en el mismo S3 backend que el backend (key diferente: `frontend/terraform.tfstate`).

```bash
cd infrastructure/terraform
AWS_PROFILE=maestria terraform init
AWS_PROFILE=maestria terraform apply -var="api_origin_domain=$LB"
# Escribir "yes"
```

Terraform crea:

- **S3 bucket** con versionado y encriptación
- **CloudFront distribution** con:
  - Origen S3 (archivos estáticos, OAC)
  - Origen API (proxy al ELB, sin caché)
  - HTTPS con certificado CloudFront por defecto
  - SPA error responses (403/404 → index.html)
  - `redirect-to-https` en todas las rutas

Anotar los outputs:

```bash
AWS_PROFILE=maestria terraform output
# cloudfront_url             = "https://xxxxx.cloudfront.net"
# cloudfront_distribution_id = "EXXXXXXXX"
# s3_bucket_name             = "proyecto-final-dev-frontend-*"
```

### Paso 3: Build y deploy

```bash
cd ../..  # volver a la raíz del proyecto

# Obtener outputs de terraform
CF_URL=$(cd infrastructure/terraform && AWS_PROFILE=maestria terraform output -raw cloudfront_url)
CF_ID=$(cd infrastructure/terraform && AWS_PROFILE=maestria terraform output -raw cloudfront_distribution_id)
S3_BUCKET=$(cd infrastructure/terraform && AWS_PROFILE=maestria terraform output -raw s3_bucket_name)

# Build con la URL de CloudFront como API base
VITE_API_BASE_URL="${CF_URL}/api/v1" yarn build

# Subir a S3
AWS_PROFILE=maestria aws s3 sync dist/ s3://${S3_BUCKET}/ --delete

# Invalidar caché de CloudFront
AWS_PROFILE=maestria aws cloudfront create-invalidation \
  --distribution-id $CF_ID \
  --paths "/*"
```

### Paso 4: Verificar

```bash
curl -s $CF_URL/                              # Web app
curl -s $CF_URL/health                        # Gateway health
curl -s $CF_URL/api/v1/search/destinations    # API proxy
```

---

## Actualizar después de cambios en código

```bash
CF_URL=$(cd infrastructure/terraform && AWS_PROFILE=maestria terraform output -raw cloudfront_url)
CF_ID=$(cd infrastructure/terraform && AWS_PROFILE=maestria terraform output -raw cloudfront_distribution_id)
S3_BUCKET=$(cd infrastructure/terraform && AWS_PROFILE=maestria terraform output -raw s3_bucket_name)

VITE_API_BASE_URL="${CF_URL}/api/v1" yarn build
AWS_PROFILE=maestria aws s3 sync dist/ s3://${S3_BUCKET}/ --delete
AWS_PROFILE=maestria aws cloudfront create-invalidation --distribution-id $CF_ID --paths "/*"
```

> La invalidación tarda ~30-60 segundos en propagarse.

---

## Destruir infraestructura

```bash
cd infrastructure/terraform

# Vaciar bucket (incluyendo versiones)
S3_BUCKET=$(AWS_PROFILE=maestria terraform output -raw s3_bucket_name)
AWS_PROFILE=maestria aws s3 rm s3://${S3_BUCKET}/ --recursive
# Si el bucket tiene versionado, también eliminar versiones antiguas:
AWS_PROFILE=maestria aws s3api list-object-versions --bucket $S3_BUCKET --output json | \
  python3 -c "
import json,sys,subprocess
d=json.load(sys.stdin)
objs=[{'Key':v['Key'],'VersionId':v['VersionId']} for v in d.get('Versions',[])+d.get('DeleteMarkers',[])]
if objs:
    json.dump({'Objects':objs,'Quiet':True},open('/tmp/del.json','w'))
    subprocess.run(['aws','s3api','delete-objects','--bucket','$S3_BUCKET','--delete','file:///tmp/del.json','--profile','maestria'])
"

# Destruir infraestructura
AWS_PROFILE=maestria terraform destroy -var="api_origin_domain=unused"
```

> `api_origin_domain` se requiere como variable pero no se usa durante destroy.

---

## State Management

El state de terraform se almacena en S3 (no local):

| Config            | Valor                                  |
| ----------------- | -------------------------------------- |
| Bucket            | `proyecto-final-tf-state-881005428234` |
| Key               | `frontend/terraform.tfstate`           |
| Lock table        | `proyecto-final-terraform-locks`       |
| Backend state key | `eks/terraform.tfstate`                |

Esto permite:

- `terraform destroy` funciona desde cualquier máquina
- No se pierde el state al borrar archivos locales
- Compartido con el backend terraform (mismo bucket, diferente key)

---

## Troubleshooting

| Problema                                      | Solución                                                              |
| --------------------------------------------- | --------------------------------------------------------------------- |
| Mixed content (HTTPS → HTTP)                  | `VITE_API_BASE_URL` debe usar `https://` (la URL de CloudFront)       |
| API retorna 502/504                           | ELB no está activo. Verificar `kubectl get ingress`                   |
| Cambios no se reflejan                        | Ejecutar `aws cloudfront create-invalidation`                         |
| SPA routes retornan 403                       | CloudFront tiene custom error responses (403/404 → index.html)        |
| `new URL()` error en JS                       | `VITE_API_BASE_URL` debe ser URL absoluta, no relativa                |
| Bucket name conflict                          | Nombres S3 son globales — incluir account ID                          |
| `terraform destroy` falla por bucket no vacío | Eliminar todas las versiones antes de destruir (ver sección Destruir) |
| State perdido                                 | State está en S3, no local. `terraform init` lo recupera              |
