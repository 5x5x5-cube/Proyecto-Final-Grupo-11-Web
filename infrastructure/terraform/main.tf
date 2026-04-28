terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

module "frontend" {
  source = "./modules/frontend"

  project_name      = "proyecto-final"
  environment       = "dev"
  api_origin_domain = "abe9ed9df940d49d2812f120b8116159-d4f3705a7f9a3e00.elb.us-east-1.amazonaws.com"
  domain_name       = ""
}
