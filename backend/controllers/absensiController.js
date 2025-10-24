import {
  getAllAbsensi,
  getAbsensiById,
  createAbsensi,
  updateAbsensi,
  deleteAbsensi,
} from "../models/absensiModel.js";

export async function getAll(req, res) {
  try {
    const absensi = await getAllAbsensi();
    res.status(200).json(absensi);
  } catch (error) {
    console.error("Error get absensi:", error);
    res.status(500).json({ message: "Gagal mengambil data absensi" });
  }
}

export async function getById(req, res) {
  try {
    const absensi = await getAbsensiById(req.params.id);
    if (!absensi) return res.status(404).json({ message: "Absensi tidak ditemukan" });
    res.status(200).json(absensi);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data absensi" });
  }
}

export async function create(req, res) {
  try {
    const { user_id, tanggal, jam_masuk, jam_keluar, status } = req.body;

    if (!user_id || !tanggal || !status) {
      return res.status(400).json({ message: "user_id, tanggal, dan status wajib diisi" });
    }

    const id = await createAbsensi({ user_id, tanggal, jam_masuk, jam_keluar, status });
    res.status(201).json({ message: "Absensi berhasil dibuat", id });
  } catch (error) {
    console.error("Error create absensi:", error);
    res.status(500).json({ message: "Gagal membuat absensi" });
  }
}

export async function update(req, res) {
  try {
    const { user_id, tanggal, jam_masuk, jam_keluar, status } = req.body;
    await updateAbsensi(req.params.id, { user_id, tanggal, jam_masuk, jam_keluar, status });
    res.status(200).json({ message: "Absensi berhasil diperbarui" });
  } catch (error) {
    console.error("Error update absensi:", error);
    res.status(500).json({ message: "Gagal memperbarui absensi" });
  }
}

export async function remove(req, res) {
  try {
    await deleteAbsensi(req.params.id);
    res.status(200).json({ message: "Absensi berhasil dihapus" });
  } catch (error) {
    console.error("Error delete absensi:", error);
    res.status(500).json({ message: "Gagal menghapus absensi" });
  }
}
