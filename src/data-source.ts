import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";

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
    
    const dbUrl: string | undefined = process.env.DATABASE_URL;
    const dbType: string | undefined = process.env.DATABASE_TYPE;

    if (!dbUrl) throw new Error("Missing env var: 'DATABASE_URL'");
    if (!dbType) throw new Error("Missing env var: 'DATABASE_TYPE'");

    return {
        type: dbType as "postgres" | "mssql",
        url: dbUrl,
        logging: true,
        entities: [entitiesPath],
        migrations: [migrationPath],
    };
}

const AppDataSource = new DataSource(buildSettings());

export default AppDataSource;