import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import pool from "./index.js";

try {
  const [rows] = await pool.query("SELECT 1");
  console.log("DB CONNECTED:", rows);
} catch (err) {
  console.error("DB ERROR:", err);
}
