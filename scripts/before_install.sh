#!/bin/bash

# Update system packages
sudo yum update -y

# Install Node.js if not already installed
if ! command -v node &> /dev/null; then
    curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
    sudo yum install -y nodejs
fi

# Install yarn if not already installed
if ! command -v yarn &> /dev/null; then
    curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
    sudo yum install -y yarn
fi

# Create application directory if it doesn't exist
if [ ! -d "/home/ec2-user/RangerSteve.io" ]; then
    mkdir -p /home/ec2-user/RangerSteve.io
fi

# Stop application if running
if pm2 list | grep -q "ranger-steve"; then
    pm2 stop ranger-steve
fi

# Install PM2 globally if not already installed
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
fi
