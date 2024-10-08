#!/bin/bash

SCRIPT_DIR=$(dirname "$0")

PGPASSWORD=$DB_PASSWORD pg_dump -U $DB_USERNAME -h $DB_HOST -Fc $DB_NAME > "$SCRIPT_DIR/../data.dump"

echo "Database dump saved!"