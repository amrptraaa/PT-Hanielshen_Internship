"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Edit2, Trash2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster, toast } from "react-hot-toast";
import api from "@/lib/axios";

export default function PekerjaPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    id_role: 2,
    nama: "",
    email: "",
    password: "",
    no_hp: "",
    jabatan: "pekerja tetap",
    foto_profil: "",
  });

  const jabatanOptions = ["pekerja tetap", "freelance", "admin", "supervisior", "hrd"];

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (error: any) {
      console.error("API ERROR:", error.response?.data || error.message);
      toast.error("Gagal mengambil data users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const formatId = (id: number) => id.toString().padStart(4, "0");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/users", formData);
      toast.success("Data user berhasil ditambahkan!");
      setIsCreateOpen(false);
      fetchUsers();
      setFormData({ id_role: 2, nama: "", email: "", password: "", no_hp: "", jabatan: "pekerja tetap", foto_profil: "" });
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.error || "Gagal menambahkan user");
    }
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      await api.put(`/users/${selectedUser.id}`, formData);
      toast.success("Data user berhasil diubah!");
      setIsEditOpen(false);
      fetchUsers();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.error || "Gagal mengubah user");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/users/${id}`);
      toast.success("Data user berhasil dihapus!");
      fetchUsers();
    } catch (error: any) {
      console.error(error);
      toast.error("Gagal menghapus user");
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="p-4 sm:p-6 max-w-screen-xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Data Pekerja</h1>

          {/* Tambah User Modal */}
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#039155] text-[#FFFEFD] hover:bg-[#28A771] font-semibold text-base px-5 py-2.5 h-auto">
                <Plus className="mr-2 h-5 w-5" /> Tambah Pekerja
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg p-6">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-800">Tambah Pekerja Baru</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitCreate} className="space-y-6 mt-5">
                <div className="space-y-2">
                  <Label>Nama</Label>
                  <Input name="nama" value={formData.nama} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input name="password" type="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label>No HP</Label>
                  <Input name="no_hp" value={formData.no_hp} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label>Jabatan</Label>
                  <Select value={formData.jabatan} onValueChange={(val) => setFormData({ ...formData, jabatan: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Jabatan" />
                    </SelectTrigger>
                    <SelectContent>
                      {jabatanOptions.map((j) => (
                        <SelectItem key={j} value={j}>{j}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-4 pt-3">
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Batal</Button>
                  <Button type="submit" className="bg-[#039155] text-[#FFFEFD] hover:bg-[#28A771]">Simpan</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table Users */}
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <Table className="text-base">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[90px] py-4 px-5 font-semibold text-gray-700 whitespace-nowrap">ID</TableHead>
                <TableHead className="py-4 px-5 font-semibold text-gray-700 min-w-[180px]">Nama</TableHead>
                <TableHead className="py-4 px-5 font-semibold text-gray-700 min-w-[220px]">Email</TableHead>
                <TableHead className="py-4 px-5 font-semibold text-gray-700 min-w-[140px]">No HP</TableHead>
                <TableHead className="py-4 px-5 font-semibold text-gray-700 min-w-[140px]">Jabatan</TableHead>
                <TableHead className="py-4 px-5 text-right font-semibold text-gray-700">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((row) => (
                <TableRow key={row.id} className="hover:bg-gray-50 h-16">
                  <TableCell className="py-4 px-5 font-mono text-gray-800">{formatId(row.id)}</TableCell>
                  <TableCell className="py-4 px-5 font-medium text-gray-800">{row.nama}</TableCell>
                  <TableCell className="py-4 px-5 text-gray-700 break-words">{row.email}</TableCell>
                  <TableCell className="py-4 px-5 text-gray-700">{row.no_hp}</TableCell>
                  <TableCell className="py-4 px-5 text-gray-700 capitalize">{row.jabatan}</TableCell>
                  <TableCell className="py-4 px-5">
                    <div className="flex justify-end gap-2">
                      {/* Detail */}
                      <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 h-10 w-10 p-0"
                        onClick={() => { setSelectedUser(row); setIsDetailOpen(true); setFormData({ ...row }); }}>
                        <Eye size={18} />
                      </Button>

                      {/* Edit */}
                      <Button size="sm" variant="outline" className="text-yellow-600 border-yellow-200 hover:bg-yellow-50 h-10 w-10 p-0"
                        onClick={() => { setSelectedUser(row); setIsEditOpen(true); setFormData({ ...row }); }}>
                        <Edit2 size={18} />
                      </Button>

                      {/* Delete */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 h-10 w-10 p-0"
                            onClick={() => setDeleteId(row.id)}>
                            <Trash2 size={18} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
                            <AlertDialogDescription>Data pekerja <b>{row.nama}</b> akan dihapus permanen. Lanjutkan?</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="gap-3 sm:gap-2">
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDelete(row.id)}>Hapus</AlertDialogAction>
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

        {/* Modal Detail */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-md p-6">
            <DialogHeader>
              <DialogTitle>Detail Pekerja</DialogTitle>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-3 mt-3 text-base text-gray-700">
                <p><span className="font-semibold">ID:</span> {formatId(selectedUser.id)}</p>
                <p><span className="font-semibold">Nama:</span> {selectedUser.nama}</p>
                <p><span className="font-semibold">Email:</span> {selectedUser.email}</p>
                <p><span className="font-semibold">Password:</span> {selectedUser.password}</p>
                <p><span className="font-semibold">No HP:</span> {selectedUser.no_hp}</p>
                <p><span className="font-semibold">Jabatan:</span> <span className="capitalize">{selectedUser.jabatan}</span></p>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal Edit */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-lg p-6">
            <DialogHeader>
              <DialogTitle>Edit Data Pekerja</DialogTitle>
            </DialogHeader>
            {selectedUser && (
              <form onSubmit={handleSubmitEdit} className="space-y-6 mt-5">
                <div className="space-y-2">
                  <Label>Nama</Label>
                  <Input name="nama" value={formData.nama} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input name="password" type="password" value={formData.password} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label>No HP</Label>
                  <Input name="no_hp" value={formData.no_hp} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label>Jabatan</Label>
                  <Select value={formData.jabatan} onValueChange={(val) => setFormData({ ...formData, jabatan: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Jabatan" />
                    </SelectTrigger>
                    <SelectContent>
                      {jabatanOptions.map((j) => <SelectItem key={j} value={j}>{j}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-4 pt-3">
                  <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>Batal</Button>
                  <Button type="submit" className="bg-[#039155] text-[#FFFEFD] hover:bg-[#28A771]">Simpan Perubahan</Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
