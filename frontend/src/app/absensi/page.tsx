"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, Trash2, Pencil, Plus } from "lucide-react";
import { toast } from "sonner";

/* ================= TYPES ================= */

type Absensi = {
  id: number;
  user_id: number;
  tanggal: string;
  jam_masuk: string | null;
  jam_keluar: string | null;
  status: string;
  foto?: string | null;
};

type User = {
  id: number;
  nama: string;
};

/* ================= HELPER ================= */

const formatDate = (date: string) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

/* ================= PAGE ================= */

export default function AbsensiPage() {
  const [absensi, setAbsensi] = useState<Absensi[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [viewData, setViewData] = useState<Absensi | null>(null);
  const [editData, setEditData] = useState<Absensi | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [form, setForm] = useState({
    user_id: "",
    tanggal: "",
    jam_masuk: "",
    jam_keluar: "",
    status: "Hadir",
  });

  /* ================= FETCH ================= */

  const fetchAbsensi = async () => {
    const res = await api.get("/absensi");
    setAbsensi(res.data || []);
  };

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data || []);
  };

  useEffect(() => {
    fetchAbsensi();
    fetchUsers();
  }, []);

  /* ================= HELPERS ================= */

  const resetForm = () => {
    setForm({
      user_id: "",
      tanggal: "",
      jam_masuk: "",
      jam_keluar: "",
      status: "Hadir",
    });
  };

  const getNamaUser = (id: number) =>
    users.find((u) => u.id === id)?.nama || "-";

  const statusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "hadir":
        return "bg-green-100 text-green-700 border-green-300";
      case "izin":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "sakit":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "alpa":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100";
    }
  };

  //* ================= CREATE ================= */

  const submitCreate = async () => {
    try {
      await api.post("/absensi", {
        user_id: Number(form.user_id),
        tanggal: form.tanggal,
        jam_masuk: form.jam_masuk || null,
        jam_keluar: form.jam_keluar || null,
        status: form.status,
      });

      toast.success("Absensi berhasil ditambahkan!");
      setCreateOpen(false);
      resetForm();
      fetchAbsensi();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menambahkan absensi");
    }
  };

  /* ================= EDIT ================= */

  const openEdit = (item: Absensi) => {
    setEditData(item);
    setForm({
      user_id: String(item.user_id),
      tanggal: item.tanggal.slice(0, 10),
      jam_masuk: item.jam_masuk || "",
      jam_keluar: item.jam_keluar || "",
      status: item.status,
    });
  };

  const submitEdit = async () => {
    if (!editData) return;

    try {
      await api.put(`/absensi/${editData.id}`, {
        user_id: Number(form.user_id),
        tanggal: form.tanggal,
        jam_masuk: form.jam_masuk || null,
        jam_keluar: form.jam_keluar || null,
        status: form.status,
      });

      toast.success("Data absensi berhasil diperbarui!");
      setEditData(null);
      resetForm();
      fetchAbsensi();
    } catch (error) {
      console.error(error);
      toast.error("Gagal memperbarui absensi");
    }
  };

  /* ================= DELETE ================= */

  const deleteAbsensi = async (id: number) => {
    try {
      await api.delete(`/absensi/${id}`);
      toast.success("Data absensi berhasil dihapus!");
      fetchAbsensi();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus absensi");
    }
  };

  /* ================= FORM UI ================= */

  const AbsensiForm = () => (
    <div className="space-y-6 mt-5">
      <div className="space-y-2">
        <Label>Nama Karyawan</Label>
        <select
          value={form.user_id}
          onChange={(e) => setForm({ ...form, user_id: e.target.value })}
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#039155]"
        >
          <option value="">Pilih Karyawan</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nama}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>Tanggal</Label>
        <Input
          type="date"
          value={form.tanggal}
          onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
        />
      </div>

      <div className="flex gap-4">
        <div className="w-1/2 space-y-2">
          <Label>Jam Masuk</Label>
          <Input
            type="time"
            value={form.jam_masuk}
            onChange={(e) => setForm({ ...form, jam_masuk: e.target.value })}
          />
        </div>
        <div className="w-1/2 space-y-2">
          <Label>Jam Keluar</Label>
          <Input
            type="time"
            value={form.jam_keluar}
            onChange={(e) => setForm({ ...form, jam_keluar: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#039155]"
        >
          <option value="Hadir">Hadir</option>
          <option value="Izin">Izin</option>
          <option value="Sakit">Sakit</option>
          <option value="Alpa">Alpha</option>
        </select>
      </div>
    </div>
  );

  /* ================= UI ================= */

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Data Absensi</h1>
        <Button
          onClick={() => {
            resetForm();
            setCreateOpen(true);
          }}
          className="bg-[#039155] text-[#FFFEFD] hover:bg-[#28A771] font-semibold text-base px-5 py-2.5 h-auto"
        >
          <Plus className="mr-2 h-5 w-5" /> Tambah Absensi
        </Button>
      </div>

      <div className="border rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Masuk</TableHead>
              <TableHead>Keluar</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Foto</TableHead>
              <TableHead className="w-[150px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {absensi.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{getNamaUser(item.user_id)}</TableCell>
                <TableCell>{formatDate(item.tanggal)}</TableCell>
                <TableCell>{item.jam_masuk || "-"}</TableCell>
                <TableCell>{item.jam_keluar || "-"}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${statusBadge(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </TableCell>

                <TableCell>
                  {item.foto ? (
                    <span className="text-blue-600 text-sm">Foto Absensi</span>
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </TableCell>

                <TableCell className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-blue-600 border-blue-200 hover:bg-blue-50 h-10 w-10 p-0"
                    onClick={() => setViewData(item)}
                  >
                    <Eye size={18} />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="text-yellow-600 border-yellow-200 hover:bg-yellow-50 h-10 w-10 p-0"
                    onClick={() => openEdit(item)}
                  >
                    <Pencil size={18} />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50 h-10 w-10 p-0"
                        onClick={() => setDeleteId(item.id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Konfirmasi Penghapusan
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Data absensi <b>{getNamaUser(item.user_id)}</b> pada{" "}
                          <b>{formatDate(item.tanggal)}</b> akan dihapus
                          permanen.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => {
                            if (deleteId) deleteAbsensi(deleteId);
                            setDeleteId(null);
                          }}
                        >
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* CREATE */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">
              Tambah Absensi
            </DialogTitle>
          </DialogHeader>

          <AbsensiForm />

          <div className="flex justify-end gap-4 pt-3">
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={submitCreate}
              className="bg-[#039155] text-[#FFFEFD] hover:bg-[#28A771]"
            >
              Simpan
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* VIEW */}
      <Dialog open={!!viewData} onOpenChange={() => setViewData(null)}>
        <DialogContent className="max-w-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">
              Detail Absensi
            </DialogTitle>
          </DialogHeader>

          {viewData && (
            <div className="space-y-3 text-sm">
              <div>Nama: {getNamaUser(viewData.user_id)}</div>
              <div>Tanggal: {formatDate(viewData.tanggal)}</div>
              <div>Jam Masuk: {viewData.jam_masuk || "-"}</div>
              <div>Jam Keluar: {viewData.jam_keluar || "-"}</div>
              <div>Status: {viewData.status}</div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewData(null)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EDIT */}
      <Dialog open={!!editData} onOpenChange={() => setEditData(null)}>
        <DialogContent className="max-w-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">
              Edit Absensi
            </DialogTitle>
          </DialogHeader>

          <AbsensiForm />

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditData(null)}>
              Batal
            </Button>
            <Button
              onClick={submitEdit}
              className="bg-[#039155] text-[#FFFEFD] hover:bg-[#28A771]"
            >
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
