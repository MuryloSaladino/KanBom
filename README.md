# Kanbom Backend

# MySql instalation:

    `npm install mysql2 --save`

# Steps
 
    - Remove the existing migrations

    - npm run typeorm migration:generate ./src/migrations/migration -- -d ./src/data-source.ts

    - npm run typeorm migration:run -- -d ./src/data-source.ts

    - npm run dev