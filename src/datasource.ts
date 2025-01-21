import { DataSource } from "typeorm";
import Account from "./Entities/user";

export const AppDataSource = new DataSource({
    type: 'postgres', // Or your DB type: 'mysql', 'sqlite', etc.
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'test-server',
    synchronize: true, // Auto-sync schema (avoid in production)
    logging: true,     // Logs SQL queries to the console
    entities: [Account],  // Add your entities here
})