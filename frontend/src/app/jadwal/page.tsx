"use client";

import { useState } from "react";
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

type Jadwal = {
  id: string;
  nama: string;
  shift: string;
  tanggal: string;
  jamMasuk: string;
  jamKeluar: string;
  task: string;
};

const namaKaryawan = [
  "Andi Saputra",
  "Budi Santoso",
  "Citra Dewi",
  "Dedi Gunawan",
  "Eka Lestari",
  "Fajar Nugraha",
  "Gita Pratiwi",
  "Hendra Wijaya",
  "Intan Marlina",
  "Joko Setiawan",
];

export default function Page() {
  const [jadwalList, setJadwalList] = useState<Jadwal[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Jadwal | null>(null);
  const [searchNama, setSearchNama] = useState("");
  const [filterTanggal, setFilterTanggal] = useState("");

  const [formData, setFormData] = useState({
    nama: "",
    shift: "",
    tanggal: "",
    jamMasuk: "",
    jamKeluar: "",
    task: "",
  });

  const handleSave = () => {
    if (!formData.nama || !formData.tanggal)
      return alert("Lengkapi semua data.");
    if (editing) {
      setJadwalList((prev) =>
        prev.map((j) => (j.id === editing.id ? { ...formData, id: j.id } : j))
      );
      setEditing(null);
    } else {
      setJadwalList((prev) => [
        ...prev,
        { ...formData, id: crypto.randomUUID() },
      ]);
    }
    setFormData({
      nama: "",
      shift: "",
      tanggal: "",
      jamMasuk: "",
      jamKeluar: "",
      task: "",
    });
    setOpen(false);
  };

  const handleEdit = (jadwal: Jadwal) => {
    setEditing(jadwal);
    setFormData(jadwal);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setJadwalList((prev) => prev.filter((j) => j.id !== id));
  };

  const filtered = jadwalList.filter(
    (j) =>
      (searchNama
        ? j.nama.toLowerCase().includes(searchNama.toLowerCase())
        : true) && (filterTanggal ? j.tanggal === filterTanggal : true)
  );

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          Manage Jadwal Karyawan
        </h1>
        <Button
          onClick={() => {
            setOpen(true);
            setEditing(null);
          }}
          className="bg-[#039155] text-[#FFFEFD] hover:bg-[#28A771]"
        >
          <Plus className="mr-2 h-4 w-4" /> Tambah Jadwal
        </Button>
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 mb-8 items-center">
        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari nama karyawan..."
            className="pl-9 border-blue-300 focus:ring-2 focus:ring-blue-500"
            value={searchNama}
            onChange={(e) => setSearchNama(e.target.value)}
          />
        </div>

        <Input
          type="date"
          className="w-full sm:w-[200px] border-blue-300 focus:ring-2 focus:ring-blue-500"
          value={filterTanggal}
          onChange={(e) => setFilterTanggal(e.target.value)}
        />
      </div>

      {/* Card Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada jadwal.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((j) => (
            <Card
              key={j.id}
              className="border border-blue-100 shadow-md hover:shadow-lg transition-all rounded-2xl"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-blue-700">{j.nama}</CardTitle>
                <p className="text-sm text-gray-500">
                  {j.shift} • {j.tanggal}
                </p>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Jam Masuk:</span> {j.jamMasuk}
                </p>
                <p>
                  <span className="font-semibold">Jam Keluar:</span>{" "}
                  {j.jamKeluar}
                </p>
                <p>
                  <span className="font-semibold">Task:</span> {j.task}
                </p>

                <div className="flex justify-end gap-2 pt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(j)}
                    className="hover:bg-blue-50"
                  >
                    <Edit2 className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(j.id)}
                    className="hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog Form */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg p-6 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-blue-700 text-lg">
              {editing ? "Edit Jadwal" : "Tambah Jadwal"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label className="text-sm text-gray-600">Nama Karyawan</Label>
                <Input
                  list="nama-karyawan"
                  placeholder="Cari nama karyawan..."
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData({ ...formData, nama: e.target.value })
                  }
                  className="border-blue-300 focus:ring-2 focus:ring-blue-500"
                />
                <datalist id="nama-karyawan">
                  {namaKaryawan.map((n) => (
                    <option key={n} value={n} />
                  ))}
                </datalist>
              </div>

              <div>
                <Label className="text-sm text-gray-600">Shift</Label>
                <Input
                  placeholder="Contoh: Pagi / Sore"
                  value={formData.shift}
                  onChange={(e) =>
                    setFormData({ ...formData, shift: e.target.value })
                  }
                  className="border-blue-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <Label className="text-sm text-gray-600">Tanggal</Label>
                <Input
                  type="date"
                  value={formData.tanggal}
                  onChange={(e) =>
                    setFormData({ ...formData, tanggal: e.target.value })
                  }
                  className="border-blue-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <Label className="text-sm text-gray-600">Jam Masuk</Label>
                  <Input
                    type="time"
                    value={formData.jamMasuk}
                    onChange={(e) =>
                      setFormData({ ...formData, jamMasuk: e.target.value })
                    }
                    className="border-blue-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="w-1/2">
                  <Label className="text-sm text-gray-600">Jam Keluar</Label>
                  <Input
                    type="time"
                    value={formData.jamKeluar}
                    onChange={(e) =>
                      setFormData({ ...formData, jamKeluar: e.target.value })
                    }
                    className="border-blue-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <Label className="text-sm text-gray-600">Task</Label>
                <Input
                  placeholder="Masukkan deskripsi tugas..."
                  value={formData.task}
                  onChange={(e) =>
                    setFormData({ ...formData, task: e.target.value })
                  }
                  className="border-blue-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handleSave}
              className="bg-[#039155] text-[#FFFEFD] hover:bg-[#28A771] font-semibold"
            >
              {editing ? "Simpan Perubahan" : "Tambah Jadwal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
