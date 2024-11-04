import "dotenv/config";
import "reflect-metadata";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { getEnv } from "./extensions/env.extensions";

const buildSettings = (): DataSourceOptions => {
    const entitiesPath: string = path.join(__dirname, './entities/**.{ts,js}');
    const migrationPath: string = path.join(__dirname, './migrations/**.{ts,js}');
    const nodeEnv: string | undefined = process.env.NODE_ENV; 

    if (nodeEnv === 'test') {
        return {
          type: 'sqlite',
          database: ':memory:',
          synchronize: true,
          entities: [entitiesPath],
        };
    }
    
    const database = getEnv("DB_NAME");
    const type = getEnv("DB_TYPE");
    const username = getEnv("DB_USERNAME");
    const password = getEnv("DB_PASSWORD");
    const url = getEnv("DB_URL");

    return {
        url,
        type: type as "postgres" | "mssql",
        username,
        password,
        database,
        logging: nodeEnv == "dev",
        entities: [entitiesPath],
        migrations: [migrationPath],
        options: {
            trustServerCertificate: true
        }
    };
}

const AppDataSource = new DataSource(buildSettings());

export default AppDataSource;