import {
  getAllShifts,
  getShiftById,
  createShift,
  updateShift,
  deleteShift,
} from "../models/shiftModel.js";

export async function getAll(req, res) {
  try {
    const shifts = await getAllShifts();
    res.status(200).json(shifts);
  } catch (error) {
    console.error("Error getting shifts:", error);
    res.status(500).json({ message: "Gagal mengambil data shift" });
  }
}

export async function getById(req, res) {
  try {
    const shift = await getShiftById(req.params.id);
    if (!shift) return res.status(404).json({ message: "Shift tidak ditemukan" });
    res.status(200).json(shift);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data shift" });
  }
}

export async function create(req, res) {
  try {
    const { nama_shift, jam_mulai, jam_selesai } = req.body;
    if (!nama_shift || !jam_mulai || !jam_selesai) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const id = await createShift({ nama_shift, jam_mulai, jam_selesai });
    res.status(201).json({ message: "Shift berhasil dibuat", id });
  } catch (error) {
    console.error("Error creating shift:", error);
    res.status(500).json({ message: "Gagal membuat shift" });
  }
}

export async function update(req, res) {
  try {
    const { nama_shift, jam_mulai, jam_selesai } = req.body;
    await updateShift(req.params.id, { nama_shift, jam_mulai, jam_selesai });
    res.status(200).json({ message: "Shift berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ message: "Gagal memperbarui shift" });
  }
}

export async function remove(req, res) {
  try {
    await deleteShift(req.params.id);
    res.status(200).json({ message: "Shift berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus shift" });
  }
}
