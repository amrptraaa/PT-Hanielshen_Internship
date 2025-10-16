"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import moment from "moment";
import { Pencil, CheckCircle, ArrowLeft, Trash2 } from "lucide-react";

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

export default function JadwalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const event = staticEvents.find((e) => e.id === id);

  if (!event) {
    return <div className="p-6">Jadwal tidak ditemukan.</div>;
  }

  const handleDelete = () => {
    // Dummy action → nanti bisa dihubungkan ke API
    alert(`Jadwal "${event.title}" berhasil dihapus (dummy).`);
    router.push("/jadwal");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex justify-center items-start">
      <Card className="w-full max-w-3xl shadow-lg border border-gray-200 rounded-2xl">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Detail Jadwal
          </CardTitle>
          <p className="text-sm text-gray-500">
            Informasi lengkap tentang jadwal kerja lapangan
          </p>
        </CardHeader>

        <CardContent className="mt-6 space-y-6">
          {/* Grid Detail */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            <div>
              <p className="text-sm text-gray-500">Judul</p>
              <p className="text-base font-semibold text-gray-800">
                {event.title}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nama Pekerja</p>
              <p className="text-base font-semibold text-gray-800">
                {event.worker}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Task</p>
              <p className="text-base font-semibold text-gray-800">
                {event.task}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Durasi</p>
              <p className="text-base font-semibold text-gray-800">
                {event.duration}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Waktu Mulai</p>
              <p className="text-base font-semibold text-gray-800">
                {moment(event.start).format("DD MMM YYYY, HH:mm")}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Waktu Selesai</p>
              <p className="text-base font-semibold text-gray-800">
                {moment(event.end).format("DD MMM YYYY, HH:mm")}
              </p>
            </div>
          </div>

          {/* Catatan */}
          <div className="bg-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">Catatan</p>
            <p className="text-gray-700">{event.notes}</p>
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => router.push("/jadwal")}
            >
              <ArrowLeft size={16} /> Kembali
            </Button>

            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => router.push(`/jadwal/${event.id}/edit`)}
            >
              <Pencil size={16} /> Edit
            </Button>

            {/* Button Hapus dengan Pop Up */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <Trash2 size={16} /> Hapus
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Hapus Jadwal</AlertDialogTitle>
                  <AlertDialogDescription>
                    Apakah Anda yakin ingin menghapus jadwal{" "}
                    <span className="font-semibold">{event.title}</span>?
                    Tindakan ini tidak dapat dibatalkan.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Ya, Hapus
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              onClick={() => alert("Tandai selesai (dummy)")}
            >
              <CheckCircle size={16} /> Tandai Selesai
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
