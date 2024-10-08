#!/bin/bash

SCRIPT_DIR=$(dirname "$0")

PGPASSWORD=$DB_PASSWORD pg_restore -U $DB_USERNAME -h $DB_HOST -Fc $DB_NAME --no-clean > "$SCRIPT_DIR/../data.dump"

echo "Database populated"