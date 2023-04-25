import {Client, Pool, PoolClient} from "pg";
import dotenv from "dotenv";

dotenv.config();

let client: PoolClient;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT as string, 10),
});

export const openConnection = (): Promise<PoolClient> => {
    if (!client)
        return pool.connect().then((newClient: PoolClient) => {
            client = newClient;
            return client;
        });
    else
        return Promise.resolve(client);
}



