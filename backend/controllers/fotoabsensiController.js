import {
  getAllFotoAbsensi,
  getFotoAbsensiById,
  createFotoAbsensi,
  updateFotoAbsensi,
  deleteFotoAbsensi,
} from "../models/fotoabsensiModel.js";

export async function getAll(req, res) {
  try {
    const data = await getAllFotoAbsensi();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error get foto absensi:", error);
    res.status(500).json({ message: "Gagal mengambil data foto absensi" });
  }
}

export async function getById(req, res) {
  try {
    const data = await getFotoAbsensiById(req.params.id);
    if (!data) return res.status(404).json({ message: "Foto absensi tidak ditemukan" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil foto absensi" });
  }
}

export async function create(req, res) {
  try {
    const { absensi_id, file_url } = req.body;

    if (!absensi_id || !file_url) {
      return res.status(400).json({ message: "absensi_id dan file_url wajib diisi" });
    }

    const id = await createFotoAbsensi({ absensi_id, file_url });
    res.status(201).json({ message: "Foto absensi berhasil disimpan", id });
  } catch (error) {
    console.error("Error create foto absensi:", error);
    res.status(500).json({ message: "Gagal menyimpan foto absensi" });
  }
}

export async function update(req, res) {
  try {
    const { absensi_id, file_url } = req.body;
    await updateFotoAbsensi(req.params.id, { absensi_id, file_url });
    res.status(200).json({ message: "Foto absensi berhasil diperbarui" });
  } catch (error) {
    console.error("Error update foto absensi:", error);
    res.status(500).json({ message: "Gagal memperbarui foto absensi" });
  }
}

export async function remove(req, res) {
  try {
    await deleteFotoAbsensi(req.params.id);
    res.status(200).json({ message: "Foto absensi berhasil dihapus" });
  } catch (error) {
    console.error("Error delete foto absensi:", error);
    res.status(500).json({ message: "Gagal menghapus foto absensi" });
  }
}
