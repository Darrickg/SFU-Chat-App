FROM node:18-alpine

EXPOSE 8080

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx tsc

CMD ["node", "server.js"]
