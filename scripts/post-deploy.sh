#!/bin/bash

export NVM_DIR="/home/ubuntu/.nvm"
source "$NVM_DIR/nvm.sh"

echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

cd /home/ubuntu/CyberGuardX_Backend
npm install
pm2 restart all || node index.js &