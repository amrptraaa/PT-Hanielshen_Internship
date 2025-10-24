"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Edit2, Trash2, Plus } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AbsensiPage() {
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [modalType, setModalType] = useState<"create" | "edit" | "view" | null>(
    null
  );
  const [selected, setSelected] = useState<any>(null);

  const [absensi, setAbsensi] = useState([
    {
      id: 1,
      nama: "Andi Saputra",
      tanggal: "2025-10-24",
      masuk: "08:00",
      keluar: "17:00",
      status: "Hadir",
    },
    {
      id: 2,
      nama: "Budi Santoso",
      tanggal: "2025-10-24",
      masuk: "08:10",
      keluar: "17:00",
      status: "Hadir",
    },
    {
      id: 3,
      nama: "Citra Dewi",
      tanggal: "2025-10-24",
      masuk: "08:30",
      keluar: "17:05",
      status: "Terlambat",
    },
    {
      id: 4,
      nama: "Dedi Gunawan",
      tanggal: "2025-10-24",
      masuk: "07:55",
      keluar: "16:59",
      status: "Hadir",
    },
    {
      id: 5,
      nama: "Eka Lestari",
      tanggal: "2025-10-24",
      masuk: "08:05",
      keluar: "17:10",
      status: "Hadir",
    },
    {
      id: 6,
      nama: "Fajar Nugraha",
      tanggal: "2025-10-24",
      masuk: "08:20",
      keluar: "17:15",
      status: "Terlambat",
    },
    {
      id: 7,
      nama: "Gita Pratiwi",
      tanggal: "2025-10-24",
      masuk: "08:00",
      keluar: "16:58",
      status: "Hadir",
    },
    {
      id: 8,
      nama: "Hendra Wijaya",
      tanggal: "2025-10-24",
      masuk: "08:12",
      keluar: "17:00",
      status: "Hadir",
    },
    {
      id: 9,
      nama: "Intan Marlina",
      tanggal: "2025-10-24",
      masuk: "08:25",
      keluar: "17:05",
      status: "Terlambat",
    },
    {
      id: 10,
      nama: "Joko Setiawan",
      tanggal: "2025-10-24",
      masuk: "07:59",
      keluar: "17:01",
      status: "Hadir",
    },
  ]);

  const StatusBadge = ({ status }: { status: string }) => {
    let color = "bg-gray-200 text-gray-700";
    if (status === "Hadir") color = "bg-green-100 text-green-600";
    if (status === "Ijin") color = "bg-yellow-100 text-yellow-600";
    if (status === "Alpha") color = "bg-red-100 text-red-600";
    if (status === "Terlambat") color = "bg-orange-100 text-orange-600";
    return (
      <span className={`px-3 py-1 rounded-md text-sm font-medium ${color}`}>
        {status}
      </span>
    );
  };

  const handleDelete = (id: number) => {
    setAbsensi(absensi.filter((item) => item.id !== id));
  };

  const [form, setForm] = useState({
    nama: "",
    tanggal: "",
    masuk: "",
    keluar: "",
    status: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === "create") {
      const newItem = {
        id: absensi.length + 1,
        ...form,
      };
      setAbsensi([...absensi, newItem]);
    } else if (modalType === "edit" && selected) {
      const updated = absensi.map((item) =>
        item.id === selected.id ? { ...item, ...form } : item
      );
      setAbsensi(updated);
    }
    setModalType(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Absensi Karyawan</h1>
        {/* Tombol Create dikembalikan agar modal berfungsi */}
        <Button
          className="bg-[#CDF463] text-black hover:bg-[#b5da55]"
          onClick={() => {
            setForm({
              nama: "",
              tanggal: "",
              masuk: "",
              keluar: "",
              status: "",
            });
            setModalType("create");
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Create
        </Button>
      </div>

      <div className="rounded-md border bg-white shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Jam Masuk</TableHead>
              <TableHead>Jam Keluar</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {absensi.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.nama}</TableCell>
                <TableCell>{row.tanggal}</TableCell>
                <TableCell>{row.masuk}</TableCell>
                <TableCell>{row.keluar}</TableCell>
                <TableCell>
                  <StatusBadge status={row.status} />
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 border-red-200 hover:bg-red-100"
                        onClick={() => setDeleteId(row.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Yakin hapus data ini?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Data absensi {row.nama} tanggal {row.tanggal} akan
                          dihapus permanen.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => handleDelete(row.id)}
                        >
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Button
                    size="sm"
                    variant="outline"
                    className="text-gray-500 border-gray-200 hover:bg-gray-100"
                    onClick={() => {
                      setSelected(row);
                      setModalType("view");
                    }}
                  >
                    <Eye size={16} />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="text-blue-500 border-blue-200 hover:bg-blue-100"
                    onClick={() => {
                      setSelected(row);
                      setForm(row);
                      setModalType("edit");
                    }}
                  >
                    <Edit2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal Create/Edit */}
      <Dialog
        open={modalType === "create" || modalType === "edit"}
        onOpenChange={() => setModalType(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {modalType === "create" ? "Tambah Data Absensi" : "Edit Absensi"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium">Nama</label>
              <Input
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                placeholder="Nama Karyawan"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Tanggal</label>
              <Input
                type="date"
                value={form.tanggal}
                onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Jam Masuk</label>
                <Input
                  type="time"
                  value={form.masuk}
                  onChange={(e) => setForm({ ...form, masuk: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Jam Keluar</label>
                <Input
                  type="time"
                  value={form.keluar}
                  onChange={(e) => setForm({ ...form, keluar: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm({ ...form, status: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hadir">Hadir</SelectItem>
                  <SelectItem value="Ijin">Ijin</SelectItem>
                  <SelectItem value="Alpha">Alpha</SelectItem>
                  <SelectItem value="Terlambat">Terlambat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Simpan
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalType(null)}
              >
                Batal
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal View */}
      <Dialog
        open={modalType === "view"}
        onOpenChange={() => setModalType(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detail Absensi</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-2 mt-3">
              <p>
                <b>Nama:</b> {selected.nama}
              </p>
              <p>
                <b>Tanggal:</b> {selected.tanggal}
              </p>
              <p>
                <b>Jam Masuk:</b> {selected.masuk}
              </p>
              <p>
                <b>Jam Keluar:</b> {selected.keluar}
              </p>
              <p>
                <b>Status:</b> <StatusBadge status={selected.status} />
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalType(null)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
