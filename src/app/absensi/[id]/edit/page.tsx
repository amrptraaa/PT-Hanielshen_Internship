"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AbsensiEditPage() {
  const { id } = useParams();
  const router = useRouter();

  // Data statis absensi
  const absensi = [
    {
      id: 1,
      nama: "N. Karyawan",
      tanggal: "2025-01-01",
      masuk: "08:00",
      keluar: "17:00",
      status: "Hadir",
    },
    {
      id: 2,
      nama: "N. Karyawan",
      tanggal: "2025-01-02",
      masuk: "08:00",
      keluar: "17:00",
      status: "Hadir",
    },
    {
      id: 3,
      nama: "N. Karyawan",
      tanggal: "2025-01-03",
      masuk: "08:00",
      keluar: "17:00",
      status: "Ijin",
    },
    {
      id: 4,
      nama: "N. Karyawan",
      tanggal: "2025-01-04",
      masuk: "08:00",
      keluar: "17:00",
      status: "Alpha",
    },
  ];

  const data = absensi.find((row) => row.id === Number(id));

  const [form, setForm] = useState({
    nama: data?.nama || "",
    tanggal: data?.tanggal || "",
    masuk: data?.masuk || "",
    keluar: data?.keluar || "",
    status: data?.status || "Hadir",
  });

  if (!data) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Data tidak ditemukan</h1>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data baru:", form);
    router.push("/absensi");
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 border-b pb-3">
          Edit Absensi
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nama */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Nama
            </label>
            <Input
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="rounded-md"
            />
          </div>

          {/* Tanggal */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Tanggal
            </label>
            <Input
              type="date"
              value={form.tanggal}
              onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
              className="rounded-md"
            />
          </div>

          {/* Jam Masuk & Keluar */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Jam Masuk
              </label>
              <Input
                type="time"
                value={form.masuk}
                onChange={(e) => setForm({ ...form, masuk: e.target.value })}
                className="rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Jam Keluar
              </label>
              <Input
                type="time"
                value={form.keluar}
                onChange={(e) => setForm({ ...form, keluar: e.target.value })}
                className="rounded-md"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Status
            </label>
            <Select
              value={form.status}
              onValueChange={(val) => setForm({ ...form, status: val })}
            >
              <SelectTrigger className="rounded-md">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hadir">Hadir</SelectItem>
                <SelectItem value="Ijin">Ijin</SelectItem>
                <SelectItem value="Alpha">Alpha</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
            >
              Simpan
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1 rounded-md"
            >
              Batal
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
