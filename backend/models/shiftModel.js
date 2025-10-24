import { db } from "../db/index.js";

export async function getAllShifts() {
  const [rows] = await pool.query("SELECT * FROM shift ORDER BY id DESC");
  return rows;
}

export async function getShiftById(id) {
  const [rows] = await pool.query("SELECT * FROM shift WHERE id = ?", [id]);
  return rows[0];
}

export async function createShift({ nama_shift, jam_mulai, jam_selesai }) {
  const [result] = await pool.query(
    "INSERT INTO shift (nama_shift, jam_mulai, jam_selesai, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())",
    [nama_shift, jam_mulai, jam_selesai]
  );
  return result.insertId;
}

export async function updateShift(id, { nama_shift, jam_mulai, jam_selesai }) {
  await pool.query(
    "UPDATE shift SET nama_shift = ?, jam_mulai = ?, jam_selesai = ?, updated_at = NOW() WHERE id = ?",
    [nama_shift, jam_mulai, jam_selesai, id]
  );
  return true;
}

export async function deleteShift(id) {
  await pool.query("DELETE FROM shift WHERE id = ?", [id]);
  return true;
}
