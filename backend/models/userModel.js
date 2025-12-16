import pool from "../database/index.js";


export const User = {
  getAll: (callback) => {
    db.query("SELECT * FROM users", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], callback);
  },

  create: (data, callback) => {
    const query = `
      INSERT INTO users (id_role, nama, email, password, no_hp, jabatan, foto_profil, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    const values = [
      data.id_role,
      data.nama,
      data.email,
      data.password,
      data.no_hp,
      data.jabatan,
      data.foto_profil,
    ];
    db.query(query, values, callback);
  },

  update: (id, data, callback) => {
    const query = `
      UPDATE users
      SET id_role=?, nama=?, email=?, password=?, no_hp=?, jabatan=?, foto_profil=?, updated_at=NOW()
      WHERE id=?
    `;
    const values = [
      data.id_role,
      data.nama,
      data.email,
      data.password,
      data.no_hp,
      data.jabatan,
      data.foto_profil,
      id,
    ];
    db.query(query, values, callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM users WHERE id = ?", [id], callback);
  },
};
