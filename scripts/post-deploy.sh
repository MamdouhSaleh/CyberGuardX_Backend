#!/bin/bash
set -e

cd /home/ubuntu/CyberGuardX_Backend

export PATH=$PATH:/usr/bin:/usr/local/bin

echo "Node path: $(which node)"
echo "NPM path: $(which npm)"
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

echo "Installing dependencies..."
npm install

echo "Starting app in background..."
nohup npm start > app.log 2>&1 &

echo "Deployment script completed successfully."
