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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, Trash2, Pencil, Plus } from "lucide-react";

/* ================= TYPES ================= */

type Absensi = {
  id: number;
  user_id: number;
  tanggal: string;
  jam_masuk: string | null;
  jam_keluar: string | null;
  status: string;
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
      case "alpha":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100";
    }
  };

  /* ================= CREATE ================= */

  const submitCreate = async () => {
    try {
      await api.post("/absensi", {
        user_id: Number(form.user_id),
        tanggal: form.tanggal,
        jam_masuk: form.jam_masuk || null,
        jam_keluar: form.jam_keluar || null,
        status: form.status,
      });

      setCreateOpen(false);
      resetForm();
      fetchAbsensi();
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan absensi");
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

      setEditData(null);
      resetForm();
      fetchAbsensi();
    } catch {
      alert("Gagal update absensi");
    }
  };

  /* ================= DELETE ================= */

  const deleteAbsensi = async (id: number) => {
    if (!confirm("Yakin ingin menghapus absensi ini?")) return;

    try {
      await api.delete(`/absensi/${id}`);
      fetchAbsensi();
    } catch {
      alert("Gagal menghapus absensi");
    }
  };

  /* ================= FORM UI ================= */

  const AbsensiForm = () => (
    <div className="space-y-4">
      <div>
        <Label>Nama Karyawan</Label>
        <select
          value={form.user_id}
          onChange={(e) => setForm({ ...form, user_id: e.target.value })}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Pilih Karyawan</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nama}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label>Tanggal</Label>
        <Input
          type="date"
          value={form.tanggal}
          onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
        />
      </div>

      <div className="flex gap-3">
        <div className="w-1/2">
          <Label>Jam Masuk</Label>
          <Input
            type="time"
            value={form.jam_masuk}
            onChange={(e) =>
              setForm({ ...form, jam_masuk: e.target.value })
            }
          />
        </div>
        <div className="w-1/2">
          <Label>Jam Keluar</Label>
          <Input
            type="time"
            value={form.jam_keluar}
            onChange={(e) =>
              setForm({ ...form, jam_keluar: e.target.value })
            }
          />
        </div>
      </div>

      <div>
        <Label>Status</Label>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full border rounded px-3 py-2"
        >
          <option value="Hadir">Hadir</option>
          <option value="Izin">Izin</option>
          <option value="Sakit">Sakit</option>
          <option value="Alpha">Alpha</option>
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
          className="bg-green-600 text-white"
        >
          <Plus size={16} className="mr-2" /> Tambah Absensi
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
                <TableCell className="flex gap-2">
                  <Button size="icon" variant="outline" onClick={() => setViewData(item)}>
                    <Eye size={16} />
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => openEdit(item)}>
                    <Pencil size={16} />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => deleteAbsensi(item.id)}>
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* CREATE MODAL */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Absensi</DialogTitle>
          </DialogHeader>
          <AbsensiForm />
          <DialogFooter>
            <Button onClick={submitCreate} className="bg-green-600 text-white">
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* VIEW & EDIT MODAL TETAP AMAN */}
    </div>
  );
}
