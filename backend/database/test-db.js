import { pool } from "./config/db.js";

const test = async () => {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("DB Connected:", rows);
  } catch (err) {
    console.error("DB Error:", err);
  }
};

test();
