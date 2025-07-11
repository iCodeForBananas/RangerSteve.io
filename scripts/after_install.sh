#!/bin/bash

# Navigate to application directory
cd /home/ec2-user/RangerSteve.io

# Install dependencies
yarn install

# Build the application
yarn build

# Set proper permissions
sudo chown -R ec2-user:ec2-user /home/ec2-user/RangerSteve.io
