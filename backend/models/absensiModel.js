import { db } from "../db/index.js";

export async function getAllAbsensi() {
  const [rows] = await pool.query(`
    SELECT a.*, u.nama AS nama_user
    FROM absensi a
    JOIN users u ON a.user_id = u.id
    ORDER BY a.tanggal DESC
  `);
  return rows;
}

export async function getAbsensiById(id) {
  const [rows] = await pool.query(`
    SELECT a.*, u.nama AS nama_user
    FROM absensi a
    JOIN users u ON a.user_id = u.id
    WHERE a.id = ?
  `, [id]);
  return rows[0];
}

export async function createAbsensi({ user_id, tanggal, jam_masuk, jam_keluar, status }) {
  const [result] = await pool.query(
    `INSERT INTO absensi (user_id, tanggal, jam_masuk, jam_keluar, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
    [user_id, tanggal, jam_masuk, jam_keluar, status]
  );
  return result.insertId;
}

export async function updateAbsensi(id, { user_id, tanggal, jam_masuk, jam_keluar, status }) {
  await pool.query(
    `UPDATE absensi
     SET user_id=?, tanggal=?, jam_masuk=?, jam_keluar=?, status=?, updated_at=NOW()
     WHERE id=?`,
    [user_id, tanggal, jam_masuk, jam_keluar, status, id]
  );
  return true;
}

export async function deleteAbsensi(id) {
  await pool.query(`DELETE FROM absensi WHERE id=?`, [id]);
  return true;
}
