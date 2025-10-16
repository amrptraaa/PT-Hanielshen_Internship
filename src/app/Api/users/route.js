import pool from "../../../lib/db";

// ✅ READ - ambil semua data
export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (err) {
    console.error("Database error:", err);
    return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });
  }
}

// ✅ CREATE - tambah data baru
export async function POST(request) {
  try {
    const { nama, email, nohp, jabatan, password } = await request.json();

    if (!nama || !email || !nohp || !jabatan || !password) {
      return new Response(JSON.stringify({ error: "Data tidak lengkap" }), { status: 400 });
    }

    const [result] = await pool.query(
      "INSERT INTO users (nama, email, nohp, jabatan, password) VALUES (?, ?, ?, ?, ?)",
      [nama, email, nohp, jabatan, password]
    );

    return new Response(JSON.stringify({ success: true, id: result.insertId }), { status: 201 });
  } catch (err) {
    console.error("Gagal menambah data:", err);
    return new Response(JSON.stringify({ error: "Gagal menambah data" }), { status: 500 });
  }
}

// ✅ UPDATE - ubah data
export async function PUT(request) {
  try {
    const { id, nama, email, nohp, jabatan, password } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "ID wajib diisi" }), { status: 400 });
    }

    await pool.query(
      "UPDATE users SET nama=?, email=?, nohp=?, jabatan=?, password=? WHERE id=?",
      [nama, email, nohp, jabatan, password, id]
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Gagal mengupdate data:", err);
    return new Response(JSON.stringify({ error: "Gagal mengupdate data" }), { status: 500 });
  }
}

// ✅ DELETE - hapus data
export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "ID wajib diisi" }), { status: 400 });
    }

    await pool.query("DELETE FROM users WHERE id = ?", [id]);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Gagal menghapus data:", err);
    return new Response(JSON.stringify({ error: "Gagal menghapus data" }), { status: 500 });
  }
}
