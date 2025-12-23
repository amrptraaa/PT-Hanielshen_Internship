// controllers/authController.js
import pool from "../database/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginDesktop = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email dan password wajib diisi" });
    }

    const [rows] = await pool.query(
      `SELECT u.*, r.nama_role 
       FROM users u 
       JOIN roles r ON u.id_role = r.id 
       WHERE u.email = ?`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const user = rows[0];

    // ❌ Pegawai tidak boleh login desktop
    if (user.nama_role === "pegawai") {
      return res.status(403).json({
        message: "Pegawai tidak memiliki akses desktop",
      });
    }

    // ❌ login_type mobile tidak boleh desktop
    if (user.login_type === "mobile") {
      return res.status(403).json({
        message: "Akun ini hanya untuk mobile",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.nama_role,
        platform: "desktop",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    delete user.password;

    res.json({
      message: "Login desktop berhasil",
      token,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
