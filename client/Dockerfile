FROM node:22-bookworm-slim AS build

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock ./

COPY client/package.json ./client/package.json
COPY server/package.json ./server/package.json

RUN yarn install --frozen-lockfile

COPY client ./client

WORKDIR /app/client

RUN yarn build

FROM nginx:alpine

COPY client/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/client/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]