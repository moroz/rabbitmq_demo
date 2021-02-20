FROM node:14

WORKDIR /app

COPY package.json yarn.lock /

RUN yarn install

CMD ts-node-dev app.ts
