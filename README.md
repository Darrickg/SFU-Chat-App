# sfu-chat

## About
This project was created as part of the course CMPT 372: Web Development II. 
This repository was imported from our private University GitLab.

A chatting web application that allows Simon Fraser University students to send messages to fellow classmates taking the same courses. Each course has it's own individual chatroom that every student can access.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/). 

## Compiling express server
```
npx tsc server.ts
```

## Serving production files with express
```
node server.js
```

## Docker build
```
docker build . -t cmpt372/group3
```

## Docker run
```
docker run -d -p 8080:8080 cmpt372/group3
```
