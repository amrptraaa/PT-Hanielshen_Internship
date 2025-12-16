import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";

// PAKSA load .env dari folder backend
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

console.log("ENV CHECK:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  db: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
export const db = pool;
