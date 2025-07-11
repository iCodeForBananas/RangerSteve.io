# RangerSteve.io Deployment Guide

This guide explains how to deploy the RangerSteve.io application using AWS services.

## Architecture Overview

The deployment architecture consists of:

1. **Frontend**: Static assets hosted on AWS Amplify Console (connected directly to GitHub)
2. **Backend**: Node.js server running on an EC2 instance in a private subnet, accessible through an Application Load Balancer

## Prerequisites

1. AWS CLI installed and configured with appropriate permissions
2. GitHub repository with your RangerSteve.io code

## Deployment Steps

### 1. Deploy the Backend Infrastructure

Run the backend deployment script:

```bash
./deploy-backend.sh
```

This will:
- Create a VPC with public and private subnets
- Deploy an EC2 instance in the private subnet
- Set up an Application Load Balancer for backend access
- Configure security groups and networking

### 2. Get the Backend Endpoint

Once the CloudFormation stack is complete, get the backend endpoint from the outputs:

```bash
aws cloudformation describe-stacks --stack-name rangersteve-backend --query "Stacks[0].Outputs[?OutputKey=='BackendEndpoint'].OutputValue" --output text
```

### 3. Set Up the Frontend with AWS Amplify Console

1. Log in to the AWS Management Console and navigate to AWS Amplify
2. Click "New app" > "Host web app"
3. Connect to your GitHub repository
4. Configure the build settings:
   - Amplify will automatically detect that it's a Node.js application
   - You can use the provided amplify.yml file for build settings
5. Add environment variables:
   - Name: `BACKEND_URL`
   - Value: [The backend endpoint from step 2]
6. Deploy the application

## Accessing Your Application

Once deployment is complete:

1. Your frontend will be available at the Amplify app URL
2. The backend is accessible through the Application Load Balancer
3. WebSocket connections will be proxied through the ALB to your backend

## Troubleshooting

### Common Issues

1. **CORS Issues**: Ensure your backend allows requests from your Amplify domain
2. **Connection Problems**: Check that the security groups allow traffic between Amplify and the ALB
3. **EC2 Instance Issues**: Use AWS Systems Manager Session Manager to connect to the instance and check logs

### Logs

- Backend logs: `/home/ec2-user/RangerSteve.io/app.log`
- ALB logs: Enable access logs in the ALB settings

## Security Considerations

1. The EC2 instance is in a private subnet and not directly accessible from the internet
2. The Application Load Balancer acts as a security boundary
3. Configure CORS on your backend to only accept requests from your Amplify domain

## Updating the Application

1. **Frontend**: Push changes to your GitHub repository, and Amplify will automatically deploy the updates
2. **Backend**: For backend changes, you can either:
   - SSH into the EC2 instance and pull the latest changes
   - Update the CloudFormation stack with a new AMI or user data script
