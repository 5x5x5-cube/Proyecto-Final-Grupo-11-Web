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
AWS_PROFILE=maestria kubectl get ingress api-gateway -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'
```

### Paso 2: Actualizar la URL del API en Terraform

Editar `infrastructure/terraform/main.tf`:

```hcl
module "frontend" {
  source = "./modules/frontend"

  project_name      = "proyecto-final"
  environment       = "dev"
  api_origin_domain = "<ELB-HOSTNAME>"  # sin http://, solo el hostname
  domain_name       = ""
}
```

### Paso 3: Crear infraestructura (~5 min)

```bash
cd infrastructure/terraform
AWS_PROFILE=maestria terraform init
AWS_PROFILE=maestria terraform plan
AWS_PROFILE=maestria terraform apply
# Escribir "yes"
```

Terraform crea:

- **S3 bucket** (`proyecto-final-dev-frontend-*`) con versionado y encriptación
- **CloudFront distribution** con:
  - Origen S3 (archivos estáticos, OAC)
  - Origen API (proxy al ELB, sin caché)
  - HTTPS con certificado CloudFront por defecto
  - SPA error responses (403/404 → index.html)
  - `redirect-to-https` en todas las rutas

Anotar los outputs:

```bash
AWS_PROFILE=maestria terraform output
# cloudfront_url         = "https://xxxxx.cloudfront.net"
# cloudfront_distribution_id = "EXXXXXXXX"
# s3_bucket_name         = "proyecto-final-dev-frontend-*"
```

### Paso 4: Build y deploy

```bash
cd ../..  # volver a la raíz del proyecto

# Build con la URL de CloudFront como API base
VITE_API_BASE_URL="https://<CLOUDFRONT_DOMAIN>/api/v1" yarn build

# Subir a S3
AWS_PROFILE=maestria aws s3 sync dist/ s3://<S3_BUCKET_NAME>/ --delete

# Invalidar caché de CloudFront
AWS_PROFILE=maestria aws cloudfront create-invalidation \
  --distribution-id <CLOUDFRONT_ID> \
  --paths "/*"
```

### Paso 5: Verificar

```bash
curl -s https://<CLOUDFRONT_DOMAIN>/              # Web app
curl -s https://<CLOUDFRONT_DOMAIN>/health         # Gateway health
curl -s https://<CLOUDFRONT_DOMAIN>/api/v1/search/destinations  # API proxy
```

---

## Actualizar después de cambios en código

```bash
# 1. Build
VITE_API_BASE_URL="https://<CLOUDFRONT_DOMAIN>/api/v1" yarn build

# 2. Deploy
AWS_PROFILE=maestria aws s3 sync dist/ s3://<S3_BUCKET_NAME>/ --delete

# 3. Invalidar caché
AWS_PROFILE=maestria aws cloudfront create-invalidation \
  --distribution-id <CLOUDFRONT_ID> \
  --paths "/*"
```

> La invalidación tarda ~30-60 segundos en propagarse.

---

## Despliegue actual

| Recurso        | Valor                                         |
| -------------- | --------------------------------------------- |
| CloudFront URL | `https://dycn6bg2u03a2.cloudfront.net`        |
| CloudFront ID  | `EU4D05D4NFUN9`                               |
| S3 Bucket      | `proyecto-final-dev-frontend-881005428234`    |
| API Base URL   | `https://dycn6bg2u03a2.cloudfront.net/api/v1` |

---

## Destruir infraestructura

```bash
# 1. Vaciar el bucket S3
AWS_PROFILE=maestria aws s3 rm s3://<S3_BUCKET_NAME>/ --recursive

# 2. Destruir con Terraform
cd infrastructure/terraform
AWS_PROFILE=maestria terraform destroy
```

---

## Troubleshooting

| Problema                     | Solución                                                                                                       |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Mixed content (HTTPS → HTTP) | Verificar que `VITE_API_BASE_URL` usa `https://` y que CloudFront tiene el origin del API configurado          |
| API retorna 502/504          | CloudFront no puede conectar con el ELB. Verificar que el ELB está activo y el `api_origin_domain` es correcto |
| Cambios no se reflejan       | Ejecutar `aws cloudfront create-invalidation` después de cada deploy                                           |
| SPA routes retornan 403      | Verificar que CloudFront tiene custom error responses (403 → index.html, 404 → index.html)                     |
| `new URL()` error en JS      | `VITE_API_BASE_URL` debe ser una URL absoluta (`https://...`), no relativa (`/api/v1`)                         |
| Bucket name conflict         | S3 bucket names son globales. Incluir el account ID en el nombre                                               |
