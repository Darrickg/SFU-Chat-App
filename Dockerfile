FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* .

RUN npm install

COPY . .

RUN npm run build \
    && npx tsc server.ts


FROM node:18-alpine
ENV NODE_ENV=production

EXPOSE 8080

WORKDIR /app

RUN npm install --omit-dev express

COPY --from=build /app/dist/ ./dist
COPY --from=build /app/server.js .

CMD ["node", "server.js"]
