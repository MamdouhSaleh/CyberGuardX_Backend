FROM node:22.8.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]


# docker build -t my-node-app .



# for bash shell:

# docker run -p 3000:3000 \
#   -v $(pwd):/app \                              
# -v "$(pwd)/docker-uploads":/app/docker-uploads
#   -w /app \
#   node:22.8.0 npm install && npm run dev

# for fish shell:

# docker run -p 3000:3000 \
#   -v "$PWD":/app \
#   -v "$PWD/docker-uploads":/app/docker-uploads \
#   -w /app \
#   node:22.8.0 sh -c "npm install && npm run dev"





