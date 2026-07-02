terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-south-1"
}

# --- EKS Cluster ---
resource "aws_eks_cluster" "vyapaar_mitra" {
  name     = "vyapaar-mitra-cluster"
  role_arn = "arn:aws:iam::123456789012:role/eks-role"

  vpc_config {
    subnet_ids = ["subnet-12345", "subnet-67890"]
  }
}

# --- RDS (Postgres) ---
resource "aws_db_instance" "vyapaar_db" {
  identifier           = "vyapaar-mitra-db"
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = "db.t3.micro"
  username             = "admin"
  password             = "securepassword"
  skip_final_snapshot  = true
}

# --- ElastiCache (Redis) ---
resource "aws_elasticache_cluster" "vyapaar_cache" {
  cluster_id           = "vyapaar-mitra-redis"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  engine_version       = "7.0"
  port                 = 6379
}

# --- MSK (Kafka) ---
resource "aws_msk_cluster" "vyapaar_kafka" {
  cluster_name           = "vyapaar-mitra-kafka"
  kafka_version          = "3.2.0"
  number_of_broker_nodes = 3

  broker_node_group_info {
    instance_type   = "kafka.t3.small"
    client_subnets  = ["subnet-12345", "subnet-67890", "subnet-abcde"]
    security_groups = ["sg-12345"]
  }
}

# --- S3 Bucket for Document Storage ---
resource "aws_s3_bucket" "vyapaar_docs" {
  bucket = "vyapaar-mitra-docs-storage"
}
