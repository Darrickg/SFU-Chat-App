FROM node:18-alpine

EXPOSE 8080

WORKDIR /app

COPY . .

RUN npm install
RUN npx tsc

CMD ["npm", "server.js"]
