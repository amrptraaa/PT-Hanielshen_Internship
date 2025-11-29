"use client";

import { useEffect, useState } from "react";
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
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [modalType, setModalType] = useState<"create" | "edit" | "view" | null>(
    null
  );
  const [selected, setSelected] = useState<any>(null);
  const [absensi, setAbsensi] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH DATA dari backend (jalankan sekali saat halaman dimuat)
  useEffect(() => {
    fetch("http://localhost:8080/api/absensi")
      .then((res) => res.json())
      .then((data) => {
        console.log("Response absensi dari backend:", data);
        // Kalau data langsung array → pakai langsung
        // Kalau data di dalam objek (misalnya data.data) → ambil isinya
        const list = Array.isArray(data) ? data : data.data || [];
        setAbsensi(list);
      })
      .catch((err) => {
        console.error("Error fetching absensi:", err);
        setAbsensi([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const StatusBadge = ({ status }: { status: string }) => {
    let color = "bg-gray-100 text-gray-700";
    if (status === "Hadir") color = "bg-green-100 text-green-700";
    if (status === "Ijin") color = "bg-yellow-100 text-yellow-700";
    if (status === "Alpha") color = "bg-red-100 text-red-700";
    if (status === "Terlambat") color = "bg-orange-100 text-orange-700";
    return (
      <span className={`px-3 py-1.5 rounded-md text-sm font-medium ${color}`}>
        {status}
      </span>
    );
  };

  // ✅ Hapus data (langsung update state, bisa disesuaikan dengan API DELETE)
  const handleDelete = () => {
    if (deleteId !== null) {
      fetch(`http://localhost:8080/api/absensi/${deleteId}`, {
        method: "DELETE",
      })
        .then(() => {
          setAbsensi(absensi.filter((item) => item.id !== deleteId));
          setDeleteId(null);
        })
        .catch((err) => console.error("Error deleting absensi:", err));
    }
  };

  const [form, setForm] = useState({
    nama: "",
    tanggal: "",
    masuk: "",
    keluar: "",
    status: "",
  });

  // ✅ Tambah / Edit data (POST atau PUT ke backend)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (modalType === "create") {
      fetch("http://localhost:8080/api/absensi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((newItem) => {
          setAbsensi([...absensi, newItem]);
          setModalType(null);
        })
        .catch((err) => console.error("Error creating absensi:", err));
    } else if (modalType === "edit" && selected) {
      fetch(`http://localhost:8080/api/absensi/${selected.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((updated) => {
          const newData = absensi.map((item) =>
            item.id === updated.id ? updated : item
          );
          setAbsensi(newData);
          setModalType(null);
        })
        .catch((err) => console.error("Error updating absensi:", err));
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-lg font-medium">Memuat data absensi...</div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-screen-xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Absensi Karyawan</h1>
        <Button
          className="bg-[#039155] text-[#FFFEFD] hover:bg-[#28A771] font-semibold text-base px-5 py-2.5 h-auto"
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
          <Plus className="mr-2 h-5 w-5" /> Tambah Absensi
        </Button>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <Table className="text-base">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="py-4 px-5 font-semibold text-gray-700 min-w-[180px]">
                Nama
              </TableHead>
              <TableHead className="py-4 px-5 font-semibold text-gray-700 min-w-[140px]">
                Tanggal
              </TableHead>
              <TableHead className="py-4 px-5 font-semibold text-gray-700 min-w-[120px]">
                Jam Masuk
              </TableHead>
              <TableHead className="py-4 px-5 font-semibold text-gray-700 min-w-[120px]">
                Jam Keluar
              </TableHead>
              <TableHead className="py-4 px-5 font-semibold text-gray-700 min-w-[120px]">
                Status
              </TableHead>
              <TableHead className="py-4 px-5 text-right font-semibold text-gray-700">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {absensi.map((row) => (
              <TableRow key={row.id} className="hover:bg-gray-50 h-16">
                <TableCell className="py-4 px-5 font-medium text-gray-800">
                  {row.nama}
                </TableCell>
                <TableCell className="py-4 px-5 text-gray-700">
                  {row.tanggal}
                </TableCell>
                <TableCell className="py-4 px-5 text-gray-700">
                  {row.masuk}
                </TableCell>
                <TableCell className="py-4 px-5 text-gray-700">
                  {row.keluar}
                </TableCell>
                <TableCell className="py-4 px-5">
                  <StatusBadge status={row.status} />
                </TableCell>
                <TableCell className="py-4 px-5">
                  <div className="flex justify-end gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 h-10 w-10 p-0"
                          onClick={() => setDeleteId(row.id)}
                          aria-label="Hapus data"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-lg">
                            Konfirmasi Penghapusan
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-base">
                            Data absensi <b>{row.nama}</b> tanggal{" "}
                            <b>{row.tanggal}</b> akan dihapus secara permanen.
                            Lanjutkan?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="gap-3 sm:gap-2">
                          <AlertDialogCancel className="text-base py-2.5">
                            Batal
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700 text-white text-base py-2.5"
                            onClick={handleDelete}
                          >
                            Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <Button
                      size="sm"
                      variant="outline"
                      className="text-gray-600 border-gray-200 hover:bg-gray-50 h-10 w-10 p-0"
                      onClick={() => {
                        setSelected(row);
                        setModalType("view");
                      }}
                      aria-label="Lihat detail"
                    >
                      <Eye size={18} />
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50 h-10 w-10 p-0"
                      onClick={() => {
                        setSelected(row);
                        setForm(row);
                        setModalType("edit");
                      }}
                      aria-label="Edit data"
                    >
                      <Edit2 size={18} />
                    </Button>
                  </div>
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
        <DialogContent className="max-w-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">
              {modalType === "create" ? "Tambah Data Absensi" : "Edit Absensi"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 mt-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nama</label>
              <Input
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                placeholder="Nama Karyawan"
                className="text-base py-2.5"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Tanggal
              </label>
              <Input
                type="date"
                value={form.tanggal}
                onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                className="text-base py-2.5"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Jam Masuk
                </label>
                <Input
                  type="time"
                  value={form.masuk}
                  onChange={(e) => setForm({ ...form, masuk: e.target.value })}
                  className="text-base py-2.5"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Jam Keluar
                </label>
                <Input
                  type="time"
                  value={form.keluar}
                  onChange={(e) => setForm({ ...form, keluar: e.target.value })}
                  className="text-base py-2.5"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm({ ...form, status: v })}
              >
                <SelectTrigger className="text-base py-2.5">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hadir" className="text-base">
                    Hadir
                  </SelectItem>
                  <SelectItem value="Ijin" className="text-base">
                    Ijin
                  </SelectItem>
                  <SelectItem value="Alpha" className="text-base">
                    Alpha
                  </SelectItem>
                  <SelectItem value="Terlambat" className="text-base">
                    Terlambat
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalType(null)}
                className="px-5 py-2.5 text-base"
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="bg-[#039155] hover:bg-[#28A771] text-[#FFFEFD] font-semibold px-5 py-2.5 text-base"
              >
                Simpan
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
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">
              Detail Absensi
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 mt-3 text-base text-gray-700">
              <p>
                <span className="font-semibold">Nama:</span> {selected.nama}
              </p>
              <p>
                <span className="font-semibold">Tanggal:</span>{" "}
                {selected.tanggal}
              </p>
              <p>
                <span className="font-semibold">Jam Masuk:</span>{" "}
                {selected.masuk}
              </p>
              <p>
                <span className="font-semibold">Jam Keluar:</span>{" "}
                {selected.keluar}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <StatusBadge status={selected.status} />
              </p>
            </div>
          )}
          <DialogFooter className="pt-4">
            <Button
              variant="outline"
              onClick={() => setModalType(null)}
              className="px-5 py-2.5 text-base"
            >
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
