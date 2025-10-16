"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import moment from "moment";

// Data statis (dummy)
const staticEvents = [
  {
    id: 1,
    title: "Setup Lighting",
    worker: "Budi Santoso",
    task: "Instalasi lampu panggung utama",
    start: new Date(2025, 8, 5, 8, 0),
    end: new Date(2025, 8, 5, 12, 0),
    duration: "4 jam",
    notes: "Bawa kabel ekstra dan alat grounding.",
  },
  {
    id: 2,
    title: "Dekorasi Venue",
    worker: "Siti Aisyah",
    task: "Penataan dekorasi & backdrop",
    start: new Date(2025, 8, 6, 9, 0),
    end: new Date(2025, 8, 6, 14, 0),
    duration: "5 jam",
    notes: "Verifikasi bahan dekorasi sesuai desain klien.",
  },
  {
    id: 3,
    title: "Sound System Check",
    worker: "Andi Wijaya",
    task: "Uji coba sound system & mic",
    start: new Date(2025, 8, 7, 10, 0),
    end: new Date(2025, 8, 7, 12, 0),
    duration: "2 jam",
    notes: "Pastikan semua mic wireless ter-pair.",
  },
];

export default function JadwalEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const event = staticEvents.find((e) => e.id === id);

  const [formData, setFormData] = useState({
    title: event?.title || "",
    worker: event?.worker || "",
    task: event?.task || "",
    start: event ? moment(event.start).format("YYYY-MM-DDTHH:mm") : "",
    end: event ? moment(event.end).format("YYYY-MM-DDTHH:mm") : "",
    notes: event?.notes || "",
  });

  if (!event) {
    return <div className="p-6">Jadwal tidak ditemukan.</div>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Dummy simpan → nanti bisa hubungkan ke API
    alert(`Jadwal "${formData.title}" berhasil diperbarui (dummy).`);
    router.push(`/jadwal/${event.id}/detail`);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex justify-center items-start">
      <Card className="w-full max-w-3xl shadow-lg border border-gray-200 rounded-2xl">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Edit Jadwal
          </CardTitle>
          <p className="text-sm text-gray-500">
            Ubah informasi jadwal kerja lapangan sesuai kebutuhan
          </p>
        </CardHeader>

        <CardContent className="mt-6 space-y-6">
          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title">Judul</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Masukkan judul jadwal"
              />
            </div>
            <div>
              <Label htmlFor="worker">Nama Pekerja</Label>
              <Input
                id="worker"
                name="worker"
                value={formData.worker}
                onChange={handleChange}
                placeholder="Masukkan nama pekerja"
              />
            </div>

            <div>
              <Label htmlFor="task">Task</Label>
              <Input
                id="task"
                name="task"
                value={formData.task}
                onChange={handleChange}
                placeholder="Deskripsi singkat tugas"
              />
            </div>

            <div>
              <Label htmlFor="start">Waktu Mulai</Label>
              <Input
                type="datetime-local"
                id="start"
                name="start"
                value={formData.start}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="end">Waktu Selesai</Label>
              <Input
                type="datetime-local"
                id="end"
                name="end"
                value={formData.end}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Catatan</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Tambahkan catatan untuk pekerja..."
              rows={4}
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => router.push(`/jadwal/${event.id}/detail`)}
            >
              <ArrowLeft size={16} /> Batal
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              onClick={handleSave}
            >
              <Save size={16} /> Simpan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
