"use client";
import { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function PekerjaPage() {
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [selectedPekerja, setSelectedPekerja] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const router = useRouter();

  // ✅ Ganti data statis jadi data dari API
  const [pekerja, setPekerja] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPekerja() {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Gagal mengambil data pekerja");
        const data = await res.json();
        setPekerja(data);
      } catch (err: any) {
        console.error(err);
        setError("Terjadi kesalahan saat mengambil data");
      } finally {
        setLoading(false);
      }
    }

    fetchPekerja();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setPekerja((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Gagal menghapus:", err);
    }
  };

  // Generate email otomatis dari nama
  const generateEmail = (nama: string) => {
    const parts = nama.toLowerCase().split(" ");
    if (parts.length >= 2) {
      return `${parts[0]}.${parts[1]}@employee.hanielshen.id`;
    }
    return `${parts[0]}@employee.hanielshen.id`;
  };

  // Generate password acak sederhana
  const generatePassword = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const [formData, setFormData] = useState({
    nama: "",
    nohp: "",
    jabatan: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = generateEmail(formData.nama);
    const password = generatePassword();

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, email, password }),
      });
      if (!res.ok) throw new Error("Gagal menambahkan pekerja");

      const newUser = await res.json();
      setPekerja((prev) => [
        ...prev,
        { id: newUser.id, ...formData, email, password },
      ]);
      setIsCreateOpen(false);
      setFormData({ nama: "", nohp: "", jabatan: "" });
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  // ✅ Loading dan error handling kecil tanpa ubah UI
  if (loading)
    return <div className="p-6 text-center text-gray-500">Memuat data...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header dan Tombol Create */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Data Pekerja</h1>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#CDF463] text-black hover:bg-[#b5da55]">
              <Plus className="mr-2 h-4 w-4" /> Create
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Tambah Pekerja Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <Label>Nama</Label>
                <Input
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>No Handphone</Label>
                <Input
                  name="nohp"
                  value={formData.nohp}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Jabatan</Label>
                <Input
                  name="jabatan"
                  value={formData.jabatan}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="bg-[#CDF463] text-black hover:bg-[#b5da55]"
                >
                  Simpan
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabel pekerja tetap sama */}
      <div className="rounded-md border bg-white shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>No Handphone</TableHead>
              <TableHead>Jabatan</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pekerja.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nama}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.nohp}</TableCell>
                <TableCell>{row.jabatan}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  {/* Delete */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 border-red-200 hover:bg-red-100"
                        onClick={() => setDeleteId(Number(row.id))}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Apakah Anda yakin ingin menghapus data ini?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Data pekerja <b>{row.nama}</b> akan dihapus secara
                          permanen.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => handleDelete(Number(row.id))}
                        >
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  {/* Detail dan Edit tetap sama */}
                  {/* ...tidak diubah... */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
