# Commands for migrations

### Generate migrations
npm run typeorm migration:generate ./src/migrations/MIGRATION_NAME -- -- -d ./src/data-source.ts

### Run migrations
npm run typeorm migration:run -- -- -d ./src/data-source.ts