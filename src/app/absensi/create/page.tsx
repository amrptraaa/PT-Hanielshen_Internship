"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateAbsensiPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nama: "",
    tanggal: "",
    masuk: "",
    keluar: "",
    status: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data baru:", formData);
    // Tambahkan logic simpan ke API / database di sini
    router.push("/absensi");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6">Tambah Data Absensi</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama */}
        <div>
          <label className="block text-sm font-medium mb-1">Nama</label>
          <Input
            type="text"
            placeholder="Nama Karyawan"
            value={formData.nama}
            onChange={(e) => handleChange("nama", e.target.value)}
          />
        </div>

        {/* Tanggal */}
        <div>
          <label className="block text-sm font-medium mb-1">Tanggal</label>
          <Input
            type="date"
            value={formData.tanggal}
            onChange={(e) => handleChange("tanggal", e.target.value)}
          />
        </div>

        {/* Jam Masuk */}
        <div>
          <label className="block text-sm font-medium mb-1">Jam Masuk</label>
          <Input
            type="time"
            value={formData.masuk}
            onChange={(e) => handleChange("masuk", e.target.value)}
          />
        </div>

        {/* Jam Keluar */}
        <div>
          <label className="block text-sm font-medium mb-1">Jam Keluar</label>
          <Input
            type="time"
            value={formData.keluar}
            onChange={(e) => handleChange("keluar", e.target.value)}
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <Select
            onValueChange={(value) => handleChange("status", value)}
            value={formData.status}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hadir">Hadir</SelectItem>
              <SelectItem value="Ijin">Ijin</SelectItem>
              <SelectItem value="Alpha">Alpha</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Simpan
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/absensi")}
          >
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
}
