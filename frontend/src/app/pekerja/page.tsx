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
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setPekerja((prev) =>
      prev.map((p) => (p.id === selectedPekerja.id ? { ...p, ...formData } : p))
    );
    setIsEditOpen(false);
  };

  // Fungsi untuk format ID 0001, 0002 ...
  const formatId = (id: number) => id.toString().padStart(4, "0");

  return (
    <div className="p-6 space-y-6">
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
                <Label>Email</Label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
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
                <Select
                  value={formData.jabatan}
                  onValueChange={(val) =>
                    setFormData({ ...formData, jabatan: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Jabatan" />
                  </SelectTrigger>
                  <SelectContent>
                    {jabatanOptions.map((j) => (
                      <SelectItem key={j} value={j}>
                        {j}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <TableCell>{formatId(row.id)}</TableCell>
                <TableCell>{row.nama}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.nohp}</TableCell>
                <TableCell>{row.jabatan}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-blue-500 border-blue-200 hover:bg-blue-100"
                    onClick={() => {
                      setSelectedPekerja(row);
                      setIsDetailOpen(true);
                      setFormData({ ...row });
                    }}
                  >
                    <Eye size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-yellow-500 border-yellow-200 hover:bg-yellow-100"
                    onClick={() => {
                      setSelectedPekerja(row);
                      setFormData({ ...row });
                      setIsEditOpen(true);
                    }}
                  >
                    <Edit2 size={16} />
                  </Button>
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
                          onClick={() => handleDelete(row.id)}
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

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detail Pekerja</DialogTitle>
          </DialogHeader>
          {selectedPekerja && (
            <div className="space-y-2">
              <p>
                <b>ID:</b> {formatId(selectedPekerja.id)}
              </p>
              <p>
                <b>Nama:</b> {selectedPekerja.nama}
              </p>
              <p>
                <b>Email:</b> {selectedPekerja.email}
              </p>
              <p>
                <b>Password:</b> {selectedPekerja.password}
              </p>
              <p>
                <b>No HP:</b> {selectedPekerja.nohp}
              </p>
              <p>
                <b>Jabatan:</b> {selectedPekerja.jabatan}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Data Pekerja</DialogTitle>
          </DialogHeader>
          {selectedPekerja && (
            <form onSubmit={handleEdit} className="space-y-4 mt-4">
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
                <Label>Email</Label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
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
                <Select
                  value={formData.jabatan}
                  onValueChange={(val) =>
                    setFormData({ ...formData, jabatan: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Jabatan" />
                  </SelectTrigger>
                  <SelectContent>
                    {jabatanOptions.map((j) => (
                      <SelectItem key={j} value={j}>
                        {j}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditOpen(false)}
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
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
