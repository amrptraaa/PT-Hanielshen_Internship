"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function CreatePekerjaPage() {
  const router = useRouter();

  // State untuk form pekerja baru
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    nohp: "",
    jabatan: "",
  });

  // Handle input perubahan
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simulasi submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data baru:", formData);
    // di sini nanti bisa ditambahkan POST ke API
    router.push("/pekerja"); // redirect balik ke list pekerja
  };

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-lg shadow-md">
        <CardHeader>
          <CardTitle>Tambah Pekerja Baru</CardTitle>
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
                placeholder="Masukkan nama pekerja"
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
              <Label htmlFor="nohp">No Handphone</Label>
              <Input
                id="nohp"
                name="nohp"
                value={formData.nohp}
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
  );
}
