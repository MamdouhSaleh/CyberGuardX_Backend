FROM node:22.8.0-slim

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE $PORT

CMD ["npm", "start"]


