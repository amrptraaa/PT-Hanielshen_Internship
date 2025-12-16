import pool from "./database/index.js";

try {
  const [rows] = await pool.query("SELECT 1");
  console.log("✅ DB CONNECTED:", rows);
} catch (err) {
  console.error("❌ DB ERROR:", err);
}
