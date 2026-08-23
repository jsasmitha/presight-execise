FROM node:22-bookworm-slim

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock ./

COPY client/package.json ./client/package.json
COPY server/package.json ./server/package.json

RUN yarn install --immutable

COPY server ./server

WORKDIR /app/server

RUN yarn workspace presight-server build

RUN cp src/db/schema.sql dist/db/schema.sql

# Copy entrypoint
COPY server/docker-entrypoint.sh ./docker-entrypoint.sh

RUN chmod +x docker-entrypoint.sh

EXPOSE 3000

CMD ["./docker-entrypoint.sh"]