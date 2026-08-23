FROM node:22-bookworm-slim

WORKDIR /app

COPY package.json yarn.lock ./

COPY client/package.json ./client/package.json
COPY server/package.json ./server/package.json

RUN yarn install --frozen-lockfile

COPY server ./server

WORKDIR /app/server

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
