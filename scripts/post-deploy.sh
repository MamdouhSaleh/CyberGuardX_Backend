#!/bin/bash
set -e

# Install Node.js and npm system-wide
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Go to your project directory
cd /home/ubuntu/CyberGuardX_Backend

# Install deps & run app
npm install
npm start


