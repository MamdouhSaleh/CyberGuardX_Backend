FROM node:22.8.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]

# docker build -t my-node-app .
# docker run -d -p 3000:3000 --name node-app-container my-node-app