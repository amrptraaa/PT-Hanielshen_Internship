import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// load .env dari folder backend
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

// path sertifikat CA dari Aiven
const caPath = path.resolve(process.cwd(), "certs/ca.pem");

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

  // 🔥 WAJIB UNTUK AIVEN
  ssl: {
    ca: fs.readFileSync(caPath),
  },

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
