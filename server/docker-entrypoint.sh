#!/bin/sh

set -e

DB_FILE="./database/users.db"

if [ ! -f "$DB_FILE" ]; then
    echo "Database file not found. Creating and seeding SQLite database..."
    yarn seed
else
    echo "Database file already exists. Skipping creation."
fi

echo "Starting the server..."
yarn start