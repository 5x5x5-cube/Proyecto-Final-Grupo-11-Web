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

  project_name = "proyecto-final"
  environment  = "dev"
  api_base_url = "http://ad952c45b8a664a19a4da645f8b8a4a8-fd0c2d064b71d8f3.elb.us-east-1.amazonaws.com/api/v1"
  domain_name  = ""
}
