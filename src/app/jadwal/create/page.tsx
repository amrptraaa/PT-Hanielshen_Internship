"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Data statis pekerja dari page pekerja (contoh)
const workers = [
  { id: 1, name: "Budi Santoso" },
  { id: 2, name: "Siti Aisyah" },
  { id: 3, name: "Andi Wijaya" },
  { id: 4, name: "Rahmat Hidayat" },
  { id: 5, name: "Semua Tim Lapangan" },
];

export default function CreateSchedulePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    worker: "",
    title: "",
    task: "",
    start: "",
    end: "",
    duration: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWorkerChange = (value: string) => {
    setFormData({ ...formData, worker: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Jadwal baru:", formData);
    router.push("/jadwal");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Create Jadwal Baru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dropdown pekerja */}
            <div>
              <Label htmlFor="worker">Nama Pekerja</Label>
              <Select onValueChange={handleWorkerChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih pekerja" />
                </SelectTrigger>
                <SelectContent>
                  {workers.map((w) => (
                    <SelectItem key={w.id} value={w.name}>
                      {w.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="title">Judul Task</Label>
              <Input
                id="title"
                name="title"
                placeholder="Contoh: Setup Lighting"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="task">Deskripsi Task</Label>
              <Textarea
                id="task"
                name="task"
                placeholder="Deskripsi singkat pekerjaan"
                value={formData.task}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start">Tanggal Mulai</Label>
                <Input
                  id="start"
                  name="start"
                  type="datetime-local"
                  value={formData.start}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="end">Tanggal Selesai</Label>
                <Input
                  id="end"
                  name="end"
                  type="datetime-local"
                  value={formData.end}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="duration">Durasi</Label>
              <Input
                id="duration"
                name="duration"
                placeholder="Contoh: 4 jam"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/jadwal")}
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="bg-black text-white hover:bg-[#CDF463] hover:text-black transition-colors"
              >
                Simpan Jadwal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
