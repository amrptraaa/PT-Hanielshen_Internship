// controllers/authController.js
import pool from "../database/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  // VALIDASI BODY SUPAYA TIDAK ADA ERROR DESTRUCTURE
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Body JSON tidak terkirim" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password wajib diisi" });
  }

  try {
    const [results] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.id_role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // hilangkan password dari response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: "Login successful",
      token,
      user: userWithoutPassword
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
};
