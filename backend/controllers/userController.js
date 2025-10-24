import { db } from "../db/index.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new user
export const createUser = async (req, res) => {
  try {
    const { id_role, nama, email, password, no_hp, jabatan, foto_profil } = req.body;
    const query = `
      INSERT INTO users (id_role, nama, email, password, no_hp, jabatan, foto_profil, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    await db.query(query, [id_role, nama, email, password, no_hp, jabatan, foto_profil]);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_role, nama, email, password, no_hp, jabatan, foto_profil } = req.body;
    const query = `
      UPDATE users 
      SET id_role=?, nama=?, email=?, password=?, no_hp=?, jabatan=?, foto_profil=?, updated_at=NOW() 
      WHERE id=?
    `;
    await db.query(query, [id_role, nama, email, password, no_hp, jabatan, foto_profil, id]);
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    await db.query("DELETE FROM users WHERE id = ?", [req.params.id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
