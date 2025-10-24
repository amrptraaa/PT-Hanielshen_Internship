import {
  getAllJadwal,
  getJadwalById,
  createJadwal,
  updateJadwal,
  deleteJadwal,
} from "../models/jadwalModel.js";

export async function getAll(req, res) {
  try {
    const jadwal = await getAllJadwal();
    res.status(200).json(jadwal);
  } catch (error) {
    console.error("Error get jadwal:", error);
    res.status(500).json({ message: "Gagal mengambil data jadwal" });
  }
}

export async function getById(req, res) {
  try {
    const jadwal = await getJadwalById(req.params.id);
    if (!jadwal) return res.status(404).json({ message: "Jadwal tidak ditemukan" });
    res.status(200).json(jadwal);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data jadwal" });
  }
}

export async function create(req, res) {
  try {
    const { user_id, shift_id, tanggal, keterangan } = req.body;

    if (!user_id || !shift_id || !tanggal) {
      return res.status(400).json({ message: "user_id, shift_id, dan tanggal wajib diisi" });
    }

    const id = await createJadwal({ user_id, shift_id, tanggal, keterangan });
    res.status(201).json({ message: "Jadwal berhasil dibuat", id });
  } catch (error) {
    console.error("Error create jadwal:", error);
    res.status(500).json({ message: "Gagal membuat jadwal" });
  }
}

export async function update(req, res) {
  try {
    const { user_id, shift_id, tanggal, keterangan } = req.body;
    await updateJadwal(req.params.id, { user_id, shift_id, tanggal, keterangan });
    res.status(200).json({ message: "Jadwal berhasil diperbarui" });
  } catch (error) {
    console.error("Error update jadwal:", error);
    res.status(500).json({ message: "Gagal memperbarui jadwal" });
  }
}

export async function remove(req, res) {
  try {
    await deleteJadwal(req.params.id);
    res.status(200).json({ message: "Jadwal berhasil dihapus" });
  } catch (error) {
    console.error("Error delete jadwal:", error);
    res.status(500).json({ message: "Gagal menghapus jadwal" });
  }
}
