import { db } from "../db/index.js";


export async function getAllJadwal() {
  const [rows] = await pool.query(`
    SELECT j.*, u.nama AS nama_user, s.nama_shift
    FROM jadwal j
    JOIN users u ON j.user_id = u.id
    JOIN shift s ON j.shift_id = s.id
    ORDER BY j.tanggal DESC
  `);
  return rows;
}

export async function getJadwalById(id) {
  const [rows] = await pool.query(`
    SELECT j.*, u.nama AS nama_user, s.nama_shift
    FROM jadwal j
    JOIN users u ON j.user_id = u.id
    JOIN shift s ON j.shift_id = s.id
    WHERE j.id = ?
  `, [id]);
  return rows[0];
}

export async function createJadwal({ user_id, shift_id, tanggal, keterangan }) {
  const [result] = await pool.query(
    "INSERT INTO jadwal (user_id, shift_id, tanggal, keterangan, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
    [user_id, shift_id, tanggal, keterangan]
  );
  return result.insertId;
}

export async function updateJadwal(id, { user_id, shift_id, tanggal, keterangan }) {
  await pool.query(
    "UPDATE jadwal SET user_id=?, shift_id=?, tanggal=?, keterangan=?, updated_at=NOW() WHERE id=?",
    [user_id, shift_id, tanggal, keterangan, id]
  );
  return true;
}

export async function deleteJadwal(id) {
  await pool.query("DELETE FROM jadwal WHERE id = ?", [id]);
  return true;
}
