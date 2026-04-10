#!/bin/bash
set -e

echo "=========================================="
echo "  Despliegue del Frontend en AWS"
echo "  S3 + CloudFront"
echo "=========================================="
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Variables
PROJECT_NAME="proyecto-final"
ENVIRONMENT="dev"
REGION="us-east-1"
API_BASE_URL="http://ad952c45b8a664a19a4da645f8b8a4a8-fd0c2d064b71d8f3.elb.us-east-1.amazonaws.com/api/v1"

echo -e "${YELLOW}Paso 1: Configurar API URL${NC}"
echo "VITE_API_BASE_URL=$API_BASE_URL" > .env
echo -e "${GREEN}API URL configurada${NC}"

echo ""
echo -e "${YELLOW}Paso 2: Instalar dependencias${NC}"
npm install

echo ""
echo -e "${YELLOW}Paso 3: Build del frontend${NC}"
npm run build
echo -e "${GREEN}Build completado${NC}"

echo ""
echo -e "${YELLOW}Paso 4: Inicializar Terraform${NC}"
cd infrastructure/terraform
rm -rf .terraform
terraform init

echo ""
echo -e "${YELLOW}Paso 5: Aplicar infraestructura (S3 + CloudFront)${NC}"
terraform apply -auto-approve

echo ""
echo -e "${YELLOW}Paso 6: Obtener nombre del bucket S3${NC}"
S3_BUCKET_NAME=$(terraform output -raw s3_bucket_name)
echo "Bucket: $S3_BUCKET_NAME"

echo ""
echo -e "${YELLOW}Paso 7: Subir archivos a S3${NC}"
cd ../..
aws s3 sync dist/ s3://$S3_BUCKET_NAME/ --delete

echo ""
echo -e "${YELLOW}Paso 8: Invalidar cache de CloudFront${NC}"
DISTRIBUTION_ID=$(terraform output -raw cloudfront_distribution_id)
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo ""
echo -e "${GREEN}=========================================="
echo "  Despliegue Completado"
echo "==========================================${NC}"
echo ""

CLOUDFRONT_URL=$(terraform output -raw cloudfront_url)
echo -e "${GREEN}URL del Frontend: $CLOUDFRONT_URL${NC}"
echo ""
echo "Comandos útiles:"
echo "  Ver bucket:     aws s3 ls s3://$S3_BUCKET_NAME"
echo "  Ver distribución: aws cloudfront get-distribution --id $DISTRIBUTION_ID"
echo "  Actualizar:     ./deploy-web.sh"
