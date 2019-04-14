### development version

FROM node:8.12.0-alpine

WORKDIR /app

COPY . .
RUN yarn

EXPOSE ${PORT}
CMD node node_modules/nodemon/bin/nodemon.js
