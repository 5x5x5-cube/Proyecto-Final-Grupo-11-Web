terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "proyecto-final-tf-state-881005428234"
    key            = "frontend/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "proyecto-final-terraform-locks"
  }
}

provider "aws" {
  region = "us-east-1"
}

variable "api_origin_domain" {
  description = "ELB hostname of the backend API (obtained from kubectl get ingress after deploying K8s)"
  type        = string
}

module "frontend" {
  source = "./modules/frontend"

  project_name      = "proyecto-final"
  environment       = "dev"
  api_origin_domain = var.api_origin_domain
  domain_name       = ""
}
