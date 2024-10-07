# Kanbom Backend

# MySql instalation:

    `npm install mysql2 --save`

# Steps
 
    - Remove the existing migrations

    - npm run typeorm migration:generate ./src/migrations/migration -- -d ./src/data-source.ts

    - npm run typeorm migration:run -- -d ./src/data-source.ts

    - npm run dev

        APP_PORT=3000
        DB_NAME=kanbom
        DB_TYPE=mysql
        DB_PORT=3306
        DB_USERNAME=root
        DB_PASSWORD=root
        DB_HOST=localhost