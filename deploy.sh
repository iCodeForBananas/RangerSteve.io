#!/bin/bash

# RangerSteve.io Deployment Script
# This script deploys the CI/CD pipeline for RangerSteve.io

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "jq is not installed. Please install it first."
    exit 1
fi

# Get parameters from user
read -p "Enter your GitHub username: " GITHUB_OWNER
read -p "Enter your GitHub repository name (default: RangerSteve.io): " GITHUB_REPO
GITHUB_REPO=${GITHUB_REPO:-RangerSteve.io}
read -p "Enter your GitHub branch (default: main): " GITHUB_BRANCH
GITHUB_BRANCH=${GITHUB_BRANCH:-main}
read -sp "Enter your GitHub OAuth token: " GITHUB_TOKEN
echo ""

# Create S3 bucket for deployment artifacts
BUCKET_NAME="rangersteve-deployment-artifacts-$(date +%s)"
echo "Creating S3 bucket: $BUCKET_NAME"
aws s3 mb s3://$BUCKET_NAME

# Package CloudFormation template
echo "Packaging CloudFormation template..."
aws cloudformation package \
    --template-file pipeline.yml \
    --s3-bucket $BUCKET_NAME \
    --output-template-file pipeline-packaged.yml

# Deploy the pipeline
echo "Deploying CI/CD pipeline..."
aws cloudformation create-stack \
    --stack-name rangersteve-pipeline \
    --template-body file://pipeline-packaged.yml \
    --parameters \
        ParameterKey=GitHubOwner,ParameterValue=$GITHUB_OWNER \
        ParameterKey=GitHubRepo,ParameterValue=$GITHUB_REPO \
        ParameterKey=GitHubBranch,ParameterValue=$GITHUB_BRANCH \
        ParameterKey=GitHubToken,ParameterValue=$GITHUB_TOKEN \
    --capabilities CAPABILITY_IAM

echo "Deployment initiated. Check the AWS CloudFormation console for progress."
echo "Once complete, your application will be deployed automatically."
