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
    tanggal: "",
    masuk: "",
    keluar: "",
    status: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/absensi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: 1, // sementara
          tanggal: formData.tanggal,
          jam_masuk: formData.masuk,
          jam_keluar: formData.keluar,
          status: formData.status,
        }),
      });

      const json = await res.json();

      if (res.ok) {
        alert("Berhasil menambahkan absensi!");
        router.push("/absensi");
      } else {
        alert(json.message || "Gagal menambahkan absensi");
      }
    } catch (error) {
      console.error(error);
      alert("Error koneksi ke server");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6">Tambah Absensi</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium mb-1">Tanggal</label>
          <Input
            type="date"
            value={formData.tanggal}
            onChange={(e) => handleChange("tanggal", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Jam Masuk</label>
          <Input
            type="time"
            value={formData.masuk}
            onChange={(e) => handleChange("masuk", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Jam Keluar</label>
          <Input
            type="time"
            value={formData.keluar}
            onChange={(e) => handleChange("keluar", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hadir">Hadir</SelectItem>
              <SelectItem value="Ijin">Ijin</SelectItem>
              <SelectItem value="Alpha">Alpha</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="bg-blue-600 text-white">
          Simpan
        </Button>
      </form>
    </div>
  );
}
