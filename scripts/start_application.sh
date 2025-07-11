#!/bin/bash

# Navigate to application directory
cd /home/ec2-user/RangerSteve.io

# Start the application with PM2
pm2 start npm --name "ranger-steve" -- start

# Save PM2 configuration
pm2 save

# Set PM2 to start on system startup
pm2 startup | grep -v PM2 | bash
