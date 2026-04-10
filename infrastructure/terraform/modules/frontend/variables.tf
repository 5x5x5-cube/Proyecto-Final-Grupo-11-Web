variable "project_name" {
  description = "Nombre del proyecto"
  type        = string
}

variable "environment" {
  description = "Ambiente (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "api_base_url" {
  description = "URL base de la API backend"
  type        = string
}

variable "domain_name" {
  description = "Nombre de dominio opcional (ej. example.com)"
  type        = string
  default     = ""
}
