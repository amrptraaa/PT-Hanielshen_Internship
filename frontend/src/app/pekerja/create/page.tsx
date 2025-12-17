"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { toast, Toaster } from "react-hot-toast";

export default function CreateUserPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    id_role: 2, // default role (misal staff)
    nama: "",
    email: "",
    password: "",
    no_hp: "",
    jabatan: "",
    foto_profil: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/users", formData);
      toast.success("Data user berhasil ditambahkan!");
      router.push("/users"); // redirect ke list
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.error || "Gagal menambahkan user");
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="p-6 flex justify-center">
        <Card className="w-full max-w-lg shadow-md">
          <CardHeader>
            <CardTitle>Tambah User Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nama">Nama</Label>
                <Input
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama user"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nama@gmail.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="no_hp">No Handphone</Label>
                <Input
                  id="no_hp"
                  name="no_hp"
                  value={formData.no_hp}
                  onChange={handleChange}
                  placeholder="08xxxxxxxxxx"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jabatan">Jabatan</Label>
                <Input
                  id="jabatan"
                  name="jabatan"
                  value={formData.jabatan}
                  onChange={handleChange}
                  placeholder="Masukkan jabatan"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="foto_profil">Foto Profil</Label>
                <Input
                  id="foto_profil"
                  name="foto_profil"
                  value={formData.foto_profil}
                  onChange={handleChange}
                  placeholder="Nama file foto"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/pekerja")}
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
          </CardContent>
        </Card>
      </div>
    </>
  );
}
