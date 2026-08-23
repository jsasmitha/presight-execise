FROM node:22-bookworm-slim

WORKDIR /app

RUN corepack enable

# Copy workspace manifests first for dependency caching
COPY package.json yarn.lock ./
COPY client/package.json ./client/package.json
COPY server/package.json ./server/package.json

RUN yarn install --immutable

# Copy server source
COPY server ./server

WORKDIR /app/server

# Build TypeScript
RUN yarn  build

# Copy runtime SQL asset
RUN cp src/db/schema.sql dist/db/schema.sql

# Make entrypoint executable
# COPY server/docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x docker-entrypoint.sh

EXPOSE 3000

CMD ["./docker-entrypoint.sh"]