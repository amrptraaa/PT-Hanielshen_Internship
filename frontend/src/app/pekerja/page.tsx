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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster, toast } from "react-hot-toast";

export default function PekerjaPage() {
  const [pekerja, setPekerja] = useState([
    {
      id: 1,
      nama: "Andi Saputra",
      email: "andi.saputra@employee.hanielshen.id",
      password: "password123",
      nohp: "081234567890",
      jabatan: "Manager",
    },
    {
      id: 2,
      nama: "Budi Santoso",
      email: "budi.santoso@employee.hanielshen.id",
      password: "password123",
      nohp: "081223344556",
      jabatan: "Staff",
    },
    {
      id: 3,
      nama: "Citra Dewi",
      email: "citra.dewi@employee.hanielshen.id",
      password: "password123",
      nohp: "082134567890",
      jabatan: "HRD",
    },
    {
      id: 4,
      nama: "Dedi Gunawan",
      email: "dedi.gunawan@employee.hanielshen.id",
      password: "password123",
      nohp: "081298765432",
      jabatan: "IT Support",
    },
    {
      id: 5,
      nama: "Eka Lestari",
      email: "eka.lestari@employee.hanielshen.id",
      password: "password123",
      nohp: "081245678901",
      jabatan: "Finance",
    },
    {
      id: 6,
      nama: "Fajar Nugraha",
      email: "fajar.nugraha@employee.hanielshen.id",
      password: "password123",
      nohp: "081234998877",
      jabatan: "Marketing",
    },
    {
      id: 7,
      nama: "Gita Pratiwi",
      email: "gita.pratiwi@employee.hanielshen.id",
      password: "password123",
      nohp: "085612345678",
      jabatan: "Admin",
    },
    {
      id: 8,
      nama: "Hendra Wijaya",
      email: "hendra.wijaya@employee.hanielshen.id",
      password: "password123",
      nohp: "081367845290",
      jabatan: "Supervisor",
    },
    {
      id: 9,
      nama: "Intan Marlina",
      email: "intan.marlina@employee.hanielshen.id",
      password: "password123",
      nohp: "081377654321",
      jabatan: "Designer",
    },
    {
      id: 10,
      nama: "Joko Setiawan",
      email: "joko.setiawan@employee.hanielshen.id",
      password: "password123",
      nohp: "081299887766",
      jabatan: "Operator",
    },
  ]);

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedPekerja, setSelectedPekerja] = useState<any>(null);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    nohp: "",
    jabatan: "pekerja tetap",
  });

  const jabatanOptions = [
    "pekerja tetap",
    "freelance",
    "admin",
    "supervisior",
    "hrd",
  ];

  const handleDelete = (id: number) => {
    setPekerja((prev) => prev.filter((item) => item.id !== id));
    toast.success("Data berhasil dihapus!");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = pekerja.length ? pekerja[pekerja.length - 1].id + 1 : 1;
    const newUser = {
      id: newId,
      ...formData,
      email:
        formData.email ||
        `${formData.nama.split(" ")[0].toLowerCase()}@employee.hanielshen.id`,
    };
    setPekerja((prev) => [...prev, newUser]);
    setIsCreateOpen(false);
    setFormData({
      nama: "",
      email: "",
      password: "",
      nohp: "",
      jabatan: "pekerja tetap",
    });
    toast.success("Data berhasil ditambahkan!");
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setPekerja((prev) =>
      prev.map((p) => (p.id === selectedPekerja.id ? { ...p, ...formData } : p))
    );
    setIsEditOpen(false);
    toast.success("Data berhasil diubah!");
  };

  const formatId = (id: number) => id.toString().padStart(4, "0");

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="p-4 sm:p-6 max-w-screen-xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Data Pekerja</h1>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#CDF463] text-black hover:bg-[#b5da55] font-semibold text-base px-5 py-2.5 h-auto">
                <Plus className="mr-2 h-5 w-5" /> Tambah Pekerja
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg p-6">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-800">
                  Tambah Pekerja Baru
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 mt-5">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Nama
                  </Label>
                  <Input
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                    className="text-base py-2.5 focus-visible:ring-2 focus-visible:ring-[#CDF463]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="text-base py-2.5 focus-visible:ring-2 focus-visible:ring-[#CDF463]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="text-base py-2.5 focus-visible:ring-2 focus-visible:ring-[#CDF463]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    No Handphone
                  </Label>
                  <Input
                    name="nohp"
                    value={formData.nohp}
                    onChange={handleChange}
                    required
                    className="text-base py-2.5 focus-visible:ring-2 focus-visible:ring-[#CDF463]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Jabatan
                  </Label>
                  <Select
                    value={formData.jabatan}
                    onValueChange={(val) =>
                      setFormData({ ...formData, jabatan: val })
                    }
                  >
                    <SelectTrigger className="text-base py-2.5 focus:ring-2 focus:ring-[#CDF463]">
                      <SelectValue placeholder="Pilih Jabatan" />
                    </SelectTrigger>
                    <SelectContent>
                      {jabatanOptions.map((j) => (
                        <SelectItem key={j} value={j} className="text-base">
                          {j}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-4 pt-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateOpen(false)}
                    className="px-5 py-2.5 text-base"
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#CDF463] text-black hover:bg-[#b5da55] font-semibold px-5 py-2.5 text-base"
                  >
                    Simpan
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <Table className="text-base">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[90px] py-4 px-5 font-semibold text-gray-700 whitespace-nowrap">
                  ID
                </TableHead>
                <TableHead className="py-4 px-5 font-semibold text-gray-700 min-w-[180px]">
                  Nama
                </TableHead>
                <TableHead className="py-4 px-5 font-semibold text-gray-700 min-w-[220px]">
                  Email
                </TableHead>
                <TableHead className="py-4 px-5 font-semibold text-gray-700 min-w-[140px]">
                  No HP
                </TableHead>
                <TableHead className="py-4 px-5 font-semibold text-gray-700 min-w-[140px]">
                  Jabatan
                </TableHead>
                <TableHead className="py-4 px-5 text-right font-semibold text-gray-700">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pekerja.map((row) => (
                <TableRow key={row.id} className="hover:bg-gray-50 h-16">
                  <TableCell className="py-4 px-5 font-mono text-gray-800">
                    {formatId(row.id)}
                  </TableCell>
                  <TableCell className="py-4 px-5 font-medium text-gray-800">
                    {row.nama}
                  </TableCell>
                  <TableCell className="py-4 px-5 text-gray-700 break-words">
                    {row.email}
                  </TableCell>
                  <TableCell className="py-4 px-5 text-gray-700">
                    {row.nohp}
                  </TableCell>
                  <TableCell className="py-4 px-5 text-gray-700 capitalize">
                    {row.jabatan}
                  </TableCell>
                  <TableCell className="py-4 px-5">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50 h-10 w-10 p-0"
                        onClick={() => {
                          setSelectedPekerja(row);
                          setIsDetailOpen(true);
                          setFormData({ ...row });
                        }}
                        aria-label="Lihat detail"
                      >
                        <Eye size={18} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-yellow-600 border-yellow-200 hover:bg-yellow-50 h-10 w-10 p-0"
                        onClick={() => {
                          setSelectedPekerja(row);
                          setFormData({ ...row });
                          setIsEditOpen(true);
                        }}
                        aria-label="Edit data"
                      >
                        <Edit2 size={18} />
                      </Button>
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
                              Data pekerja <b>{row.nama}</b> akan dihapus secara
                              permanen. Lanjutkan?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="gap-3 sm:gap-2">
                            <AlertDialogCancel className="text-base py-2.5">
                              Batal
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-700 text-white text-base py-2.5"
                              onClick={() => handleDelete(row.id)}
                            >
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-md p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-800">
                Detail Pekerja
              </DialogTitle>
            </DialogHeader>
            {selectedPekerja && (
              <div className="space-y-3 mt-3 text-base text-gray-700">
                <p>
                  <span className="font-semibold">ID:</span>{" "}
                  {formatId(selectedPekerja.id)}
                </p>
                <p>
                  <span className="font-semibold">Nama:</span>{" "}
                  {selectedPekerja.nama}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {selectedPekerja.email}
                </p>
                <p>
                  <span className="font-semibold">Password:</span>{" "}
                  {selectedPekerja.password}
                </p>
                <p>
                  <span className="font-semibold">No HP:</span>{" "}
                  {selectedPekerja.nohp}
                </p>
                <p>
                  <span className="font-semibold">Jabatan:</span>{" "}
                  <span className="capitalize">{selectedPekerja.jabatan}</span>
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-800">
                Edit Data Pekerja
              </DialogTitle>
            </DialogHeader>
            {selectedPekerja && (
              <form onSubmit={handleEdit} className="space-y-6 mt-5">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Nama
                  </Label>
                  <Input
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                    className="text-base py-2.5 focus-visible:ring-2 focus-visible:ring-[#CDF463]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="text-base py-2.5 focus-visible:ring-2 focus-visible:ring-[#CDF463]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="text-base py-2.5 focus-visible:ring-2 focus-visible:ring-[#CDF463]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    No Handphone
                  </Label>
                  <Input
                    name="nohp"
                    value={formData.nohp}
                    onChange={handleChange}
                    required
                    className="text-base py-2.5 focus-visible:ring-2 focus-visible:ring-[#CDF463]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Jabatan
                  </Label>
                  <Select
                    value={formData.jabatan}
                    onValueChange={(val) =>
                      setFormData({ ...formData, jabatan: val })
                    }
                  >
                    <SelectTrigger className="text-base py-2.5 focus:ring-2 focus:ring-[#CDF463]">
                      <SelectValue placeholder="Pilih Jabatan" />
                    </SelectTrigger>
                    <SelectContent>
                      {jabatanOptions.map((j) => (
                        <SelectItem key={j} value={j} className="text-base">
                          {j}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-4 pt-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditOpen(false)}
                    className="px-5 py-2.5 text-base"
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#CDF463] text-black hover:bg-[#b5da55] font-semibold px-5 py-2.5 text-base"
                  >
                    Simpan Perubahan
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
