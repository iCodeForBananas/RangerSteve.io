#!/bin/bash

# RangerSteve.io Backend Deployment Script
# This script deploys the backend infrastructure for RangerSteve.io

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "AWS CLI is not installed. Please install it first."
    exit 1
fi

# Create S3 bucket for deployment artifacts
BUCKET_NAME="rangersteve-deployment-artifacts-$(date +%s)"
echo "Creating S3 bucket: $BUCKET_NAME"
aws s3 mb s3://$BUCKET_NAME

# Package CloudFormation template
echo "Packaging CloudFormation template..."
aws cloudformation package \
    --template-file backend-template.yml \
    --s3-bucket $BUCKET_NAME \
    --output-template-file backend-packaged.yml

# Check if stack exists and get its status
STACK_STATUS=$(aws cloudformation describe-stacks --stack-name rangersteve-backend --query "Stacks[0].StackStatus" --output text 2>/dev/null || echo "DOES_NOT_EXIST")

echo "Current stack status: $STACK_STATUS"

if [ "$STACK_STATUS" = "DOES_NOT_EXIST" ]; then
    # Stack doesn't exist, create it
    echo "Creating new stack..."
    aws cloudformation create-stack \
        --stack-name rangersteve-backend \
        --template-body file://backend-packaged.yml \
        --capabilities CAPABILITY_IAM
    
    echo "Stack creation initiated."
elif [[ "$STACK_STATUS" == *"ROLLBACK"* || "$STACK_STATUS" == *"FAILED"* ]]; then
    # Stack is in a failed or rollback state, delete and recreate
    echo "Stack is in $STACK_STATUS state. Deleting and recreating..."
    
    # Delete the stack
    aws cloudformation delete-stack --stack-name rangersteve-backend
    
    echo "Waiting for stack deletion to complete..."
    aws cloudformation wait stack-delete-complete --stack-name rangersteve-backend
    
    # Create a new stack
    echo "Creating new stack..."
    aws cloudformation create-stack \
        --stack-name rangersteve-backend \
        --template-body file://backend-packaged.yml \
        --capabilities CAPABILITY_IAM
    
    echo "Stack creation initiated."
elif [[ "$STACK_STATUS" == *"IN_PROGRESS"* ]]; then
    # Stack operation is in progress
    echo "Stack operation is in progress. Please wait for it to complete and try again."
    exit 1
else
    # Stack exists and is in a stable state, update it
    echo "Updating existing stack..."
    aws cloudformation update-stack \
        --stack-name rangersteve-backend \
        --template-body file://backend-packaged.yml \
        --capabilities CAPABILITY_IAM
    
    if [ $? -eq 0 ]; then
        echo "Stack update initiated."
    else
        echo "No updates to be performed or an error occurred."
    fi
fi

echo "Check the AWS CloudFormation console for progress."
echo "Once complete, get the backend endpoint from the CloudFormation outputs:"
echo "aws cloudformation describe-stacks --stack-name rangersteve-backend --query \"Stacks[0].Outputs[?OutputKey=='BackendEndpoint'].OutputValue\" --output text"
