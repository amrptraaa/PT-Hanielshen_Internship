// controllers/authController.js
import pool from "../database/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    // 1️⃣ Validasi body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Body JSON tidak terkirim",
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email dan password wajib diisi",
      });
    }

    // 2️⃣ Query user
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    const user = rows[0];

    // 3️⃣ Cek password (bcrypt)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Email atau password salah",
      });
    }

    // 4️⃣ Generate JWT
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT_SECRET belum diset di .env",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.id_role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 5️⃣ Hilangkan password dari response
    const { password: _, ...userWithoutPassword } = user;

    // 6️⃣ Response sukses
    return res.status(200).json({
      message: "Login berhasil",
      token,
      user: userWithoutPassword,
    });

  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);

    return res.status(500).json({
      message: "Database error",
      error: err.message,
    });
  }
};
