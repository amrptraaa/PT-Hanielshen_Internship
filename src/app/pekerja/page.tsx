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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PekerjaPage() {
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [selectedPekerja, setSelectedPekerja] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const router = useRouter();

  // Data statis pekerja
  const pekerja = [
    {
      id: "0001",
      nama: "Aulia Rahman",
      email: "aulia.rahman@employee.hanielshen.id",
      nohp: "08123456789",
      jabatan: "Pekerja Tetap",
      password: "aulia123",
    },
    {
      id: "0002",
      nama: "Budi Santoso",
      email: "budi.santoso@employee.hanielshen.id",
      nohp: "08122334455",
      jabatan: "Freelance",
      password: "budi123",
    },
    {
      id: "0003",
      nama: "Citra Dewi",
      email: "citra.dewi@employee.hanielshen.id",
      nohp: "08199887766",
      jabatan: "Pekerja Tetap",
      password: "citra123",
    },
    {
      id: "0004",
      nama: "Dimas Prasetyo",
      email: "dimas.prasetyo@employee.hanielshen.id",
      nohp: "0822334455",
      jabatan: "Freelance",
      password: "dimas123",
    },
    {
      id: "0005",
      nama: "Eka Putri",
      email: "eka.putri@employee.hanielshen.id",
      nohp: "0831223344",
      jabatan: "Pekerja Tetap",
      password: "eka123",
    },
    {
      id: "0006",
      nama: "Farhan Akbar",
      email: "farhan.akbar@employee.hanielshen.id",
      nohp: "0834556677",
      jabatan: "Freelance",
      password: "farhan123",
    },
    {
      id: "0007",
      nama: "Gita Lestari",
      email: "gita.lestari@employee.hanielshen.id",
      nohp: "0844332211",
      jabatan: "Pekerja Tetap",
      password: "gita123",
    },
    {
      id: "0008",
      nama: "Hendra Wijaya",
      email: "hendra.wijaya@employee.hanielshen.id",
      nohp: "0855667788",
      jabatan: "Freelance",
      password: "hendra123",
    },
    {
      id: "0009",
      nama: "Indah Permata",
      email: "indah.permata@employee.hanielshen.id",
      nohp: "0855778899",
      jabatan: "Pekerja Tetap",
      password: "indah123",
    },
    {
      id: "0010",
      nama: "Joko Susilo",
      email: "joko.susilo@employee.hanielshen.id",
      nohp: "08133445566",
      jabatan: "Freelance",
      password: "joko123",
    },
  ];

  const handleDelete = (id: number) => {
    console.log("Hapus data pekerja id:", id);
    // Tambahkan logic hapus API/state
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = generateEmail(formData.nama);
    const password = generatePassword();
    console.log("Data baru:", { ...formData, email, password });
    setIsCreateOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header dengan tombol Create */}
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

      {/* Tabel pekerja */}
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

                  {/* Detail */}
                  <Dialog
                    open={isDetailOpen && selectedPekerja?.id === row.id}
                    onOpenChange={setIsDetailOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-gray-500 border-gray-200 hover:bg-gray-100"
                        onClick={() => {
                          setSelectedPekerja(row);
                          setIsDetailOpen(true);
                        }}
                      >
                        <Eye size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Detail Pekerja</DialogTitle>
                      </DialogHeader>
                      <Card className="border-none shadow-none">
                        <CardContent className="space-y-2 mt-2">
                          <div className="flex justify-between">
                            <span className="font-medium">ID:</span>
                            <span>{row.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Nama:</span>
                            <span>{row.nama}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Email:</span>
                            <span>{row.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Password:</span>
                            <span>{row.password}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">No HP:</span>
                            <span>{row.nohp}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Jabatan:</span>
                            <span>{row.jabatan}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogContent>
                  </Dialog>

                  {/* Edit */}
                  <Dialog
                    open={isEditOpen && selectedPekerja?.id === row.id}
                    onOpenChange={setIsEditOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-blue-500 border-blue-200 hover:bg-blue-100"
                        onClick={() => {
                          setSelectedPekerja(row);
                          setIsEditOpen(true);
                        }}
                      >
                        <Edit2 size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Edit Pekerja</DialogTitle>
                      </DialogHeader>
                      <form className="space-y-4 mt-4">
                        <div>
                          <Label>Nama</Label>
                          <Input defaultValue={row.nama} />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input defaultValue={row.email} />
                        </div>
                        <div>
                          <Label>Password</Label>
                          <Input type="password" defaultValue={row.password} />
                        </div>
                        <div>
                          <Label>No Handphone</Label>
                          <Input defaultValue={row.nohp} />
                        </div>
                        <div>
                          <Label>Jabatan</Label>
                          <Input defaultValue={row.jabatan} />
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditOpen(false)}
                          >
                            Batal
                          </Button>
                          <Button className="bg-[#CDF463] text-black hover:bg-[#b5da55]">
                            Simpan
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <Button
          variant="outline"
          className="w-10 h-10 rounded-full"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          &lt;
        </Button>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <Button
            key={num}
            variant={page === num ? "default" : "outline"}
            className={`w-10 h-10 rounded-full ${
              page === num ? "bg-[#CDF463] text-black" : ""
            }`}
            onClick={() => setPage(num)}
          >
            {num}
          </Button>
        ))}
        <Button
          variant="outline"
          className="w-10 h-10 rounded-full"
          onClick={() => setPage((p) => p + 1)}
        >
          &gt;
        </Button>
      </div>
    </div>
  );
}
