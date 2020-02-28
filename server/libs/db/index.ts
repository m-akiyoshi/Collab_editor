import * as dotenv from "dotenv";
import { connectDB } from "./common";

export interface DbDetails {
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  database?: string;
}

export function createDbDetails(): DbDetails {
  const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
  return {
    database: process.env.DATABASE ? process.env.DATABASE : "combine_api",
    host: process.env.DB_HOST ? process.env.DB_HOST : "localhost",
    port: port,
    user: process.env.DB_USER ? process.env.DB_USER : "api_user",
    password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "ThePass"
  };
}

export function createDbUrl(dbDetails: DbDetails) {
  return (
    `postgres://${dbDetails.user}:${dbDetails.password}@${dbDetails.host}` +
    `:${dbDetails.port}/${dbDetails.database}`
  );
}

const dbDetails = createDbDetails();
const dbUrl = createDbUrl(dbDetails);
const db = connectDB(dbUrl);

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err: Error) => {
    console.error("Unable to connect to the database:", err);
  });

export default db;
