import pool from "./index.js";

try {
  const [rows] = await pool.query("SELECT 1");
  console.log("✅ DB CONNECTED:", rows);
  process.exit(0);
} catch (err) {
  console.error("❌ DB ERROR:", err.message);
  process.exit(1);
}