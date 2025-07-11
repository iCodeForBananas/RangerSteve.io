#!/bin/bash

# Stop the application if it's running
if pm2 list | grep -q "ranger-steve"; then
    pm2 stop ranger-steve
    pm2 delete ranger-steve
fi
