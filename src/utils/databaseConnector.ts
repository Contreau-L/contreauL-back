import pkg from 'pg';
const { Client } = pkg;
import * as dotenv from 'dotenv';
let client = null;

export const connectToDb = () => {
  dotenv.config();
  try {
    client = new Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
    client.connect();
    console.log("Connected to the Database");
  } catch (err) {
    console.error(`Error connecting to the DB ${err}`);
  }
};

export const endDbConnection = () => {
  client.end();
};

export const getClient = () => client;