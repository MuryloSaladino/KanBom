import { DataSource } from "typeorm";
import AppDataSource from "../data-source";

let connection: DataSource;

beforeAll(async () => {
    await AppDataSource.initialize()
        .then((res) => (connection = res))
        .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
});
afterAll(async () => {
    await connection.destroy();
});