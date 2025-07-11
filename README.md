# RangerSteve.io

## Setup

1.  `yarn install`

## Run locally

1.  Start the NodeJS server: `yarn start`
2.  Start webpack: `yarn dev`
3.  Use `http://localhost:3000/` to access the app.

## Run deploying to production manually

1.  `yarn install`
2.  `yarn build`
3.  `yarn start`

## Automated Deployment with AWS

RangerSteve.io can be automatically deployed using AWS services:

1. The frontend is hosted on AWS Amplify Console (connected directly to GitHub)
2. The backend runs on an EC2 instance in a private subnet
3. An Application Load Balancer provides secure access to the backend

### Deployment Process

#### 1. Deploy the Backend

Run the backend deployment script:

```bash
./deploy-backend.sh
```

#### 2. Set Up the Frontend with AWS Amplify Console

1. Connect your GitHub repository to AWS Amplify Console
2. Configure the build settings using the provided amplify.yml
3. Add the backend endpoint as an environment variable

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Architecture

The application uses a secure architecture:

- Frontend static assets served by AWS Amplify
- Backend Node.js server running on EC2 in a private subnet
- Application Load Balancer providing secure access to the backend
- WebSocket connections securely proxied through the ALB
