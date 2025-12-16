import pool from "../database/index.js";


// Ambil semua foto absensi
export async function getAllFotoAbsensi() {
  const [rows] = await pool.query(`
    SELECT f.*, a.user_id, a.tanggal 
    FROM foto_absensi f
    JOIN absensi a ON f.absensi_id = a.id
    ORDER BY f.taken_at DESC
  `);
  return rows;
}

// Ambil foto berdasarkan ID
export async function getFotoAbsensiById(id) {
  const [rows] = await pool.query(`
    SELECT f.*, a.user_id, a.tanggal 
    FROM foto_absensi f
    JOIN absensi a ON f.absensi_id = a.id
    WHERE f.id = ?
  `, [id]);
  return rows[0];
}

// Tambah foto absensi
export async function createFotoAbsensi({ absensi_id, file_url }) {
  const [result] = await pool.query(
    `INSERT INTO foto_absensi (absensi_id, file_url, taken_at)
     VALUES (?, ?, NOW())`,
    [absensi_id, file_url]
  );
  return result.insertId;
}

// Update data foto absensi
export async function updateFotoAbsensi(id, { absensi_id, file_url }) {
  await pool.query(
    `UPDATE foto_absensi
     SET absensi_id=?, file_url=?, taken_at=NOW()
     WHERE id=?`,
    [absensi_id, file_url, id]
  );
  return true;
}

// Hapus foto absensi
export async function deleteFotoAbsensi(id) {
  await pool.query(`DELETE FROM foto_absensi WHERE id=?`, [id]);
  return true;
}
