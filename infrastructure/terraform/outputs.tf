output "s3_bucket_name" {
  description = "Nombre del bucket S3"
  value       = module.frontend.s3_bucket_name
}

output "s3_bucket_arn" {
  description = "ARN del bucket S3"
  value       = module.frontend.s3_bucket_arn
}

output "cloudfront_distribution_id" {
  description = "ID de la distribución CloudFront"
  value       = module.frontend.cloudfront_distribution_id
}

output "cloudfront_domain_name" {
  description = "Dominio de CloudFront (URL del frontend)"
  value       = module.frontend.cloudfront_domain_name
}

output "cloudfront_url" {
  description = "URL completa del frontend"
  value       = module.frontend.cloudfront_url
}
