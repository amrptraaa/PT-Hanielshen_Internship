"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit2, Trash2, Search } from "lucide-react";

/* ================= HELPER ================= */

const formatTanggal = (dateString: string) => {
  if (!dateString) return "-";

  const date = new Date(dateString);

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

/* ================= TYPES ================= */

type Jadwal = {
  id: number;
  user_id: number;
  shift_id: number;
  tanggal: string;
  keterangan: string;
};

type User = {
  id: number;
  nama: string;
};

type Shift = {
  id: number;
  nama_shift: string;
  jam_mulai: string;
  jam_selesai: string;
};

/* ================= COMPONENT ================= */

export default function Page() {
  const [jadwalList, setJadwalList] = useState<Jadwal[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Jadwal | null>(null);

  const [searchNama, setSearchNama] = useState("");
  const [filterTanggal, setFilterTanggal] = useState("");

  const [formData, setFormData] = useState({
    user_id: 0,
    shift_id: 0,
    tanggal: "",
    keterangan: "",
  });

  const selectedShift = shifts.find((s) => s.id === formData.shift_id);

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [jadwalRes, userRes, shiftRes] = await Promise.all([
        api.get<Jadwal[]>("/jadwal"),
        api.get<User[]>("/users"),
        api.get<Shift[]>("/shift"),
      ]);

      setJadwalList(jadwalRes.data);
      setUsers(userRes.data);
      setShifts(shiftRes.data);
    } catch (error) {
      console.error(error);
      alert("Gagal fetch data");
    }
  };

  /* ================= CRUD ================= */

  const handleSave = async () => {
    if (!formData.user_id || !formData.shift_id || !formData.tanggal) {
      alert("Lengkapi data wajib");
      return;
    }

    try {
      if (editing) {
        await api.put(`/jadwal/${editing.id}`, formData);
      } else {
        await api.post("/jadwal", formData);
      }

      fetchAll();
      setOpen(false);
      setEditing(null);
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan jadwal");
    }
  };

  const handleEdit = (j: Jadwal) => {
    setEditing(j);
    setFormData({
      user_id: j.user_id,
      shift_id: j.shift_id,
      tanggal: j.tanggal.slice(0, 10), // aman untuk input date
      keterangan: j.keterangan,
    });
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus jadwal ini?")) return;
    await api.delete(`/jadwal/${id}`);
    fetchAll();
  };

  const resetForm = () => {
    setFormData({
      user_id: 0,
      shift_id: 0,
      tanggal: "",
      keterangan: "",
    });
  };

  /* ================= FILTER ================= */

  const filtered = jadwalList.filter((j) => {
    const user = users.find((u) => u.id === j.user_id);
    const nama = user?.nama.toLowerCase() || "";

    return (
      (!searchNama || nama.includes(searchNama.toLowerCase())) &&
      (!filterTanggal || j.tanggal.slice(0, 10) === filterTanggal)
    );
  });

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          Manage Jadwal Karyawan
        </h1>
        <Button
          onClick={() => {
            setOpen(true);
            setEditing(null);
            resetForm();
          }}
          className="bg-[#039155] text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Tambah Jadwal
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari nama karyawan..."
            className="pl-9"
            value={searchNama}
            onChange={(e) => setSearchNama(e.target.value)}
          />
        </div>

        <Input
          type="date"
          value={filterTanggal}
          onChange={(e) => setFilterTanggal(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada jadwal</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((j) => {
            const user = users.find((u) => u.id === j.user_id);
            const shift = shifts.find((s) => s.id === j.shift_id);

            return (
              <Card key={j.id}>
                <CardHeader>
                  <CardTitle className="text-[#039155]">
                    {user?.nama}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    {shift?.nama_shift} • {formatTanggal(j.tanggal)}
                  </p>
                </CardHeader>

                <CardContent className="text-sm space-y-1">
                  <p>
                    Jam: {shift?.jam_mulai} - {shift?.jam_selesai}
                  </p>
                  <p>Keterangan: {j.keterangan}</p>

                  <div className="flex justify-end gap-2 pt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(j)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(j.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* ================= MODAL ================= */}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Jadwal" : "Tambah Jadwal"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nama Karyawan</Label>
              <select
                className="w-full border rounded px-2 py-2"
                value={formData.user_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    user_id: Number(e.target.value),
                  })
                }
              >
                <option value={0}>Pilih karyawan</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nama}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Shift</Label>
              <select
                className="w-full border rounded px-2 py-2"
                value={formData.shift_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shift_id: Number(e.target.value),
                  })
                }
              >
                <option value={0}>Pilih shift</option>
                {shifts.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nama_shift}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Tanggal</Label>
              <Input
                type="date"
                value={formData.tanggal}
                onChange={(e) =>
                  setFormData({ ...formData, tanggal: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Jam</Label>
              <Input
                readOnly
                value={
                  selectedShift
                    ? `${selectedShift.jam_mulai} - ${selectedShift.jam_selesai}`
                    : ""
                }
              />
            </div>

            <div className="col-span-2">
              <Label>Keterangan</Label>
              <Input
                value={formData.keterangan}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    keterangan: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSave} className="bg-[#039155] text-white">
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
