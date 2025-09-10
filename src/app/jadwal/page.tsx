"use client";

import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const localizer = momentLocalizer(moment);

// Data statis pekerja EO lapangan
const staticEvents = [
  {
    id: 1,
    title: "Setup Lighting",
    worker: "Budi Santoso",
    task: "Instalasi lampu panggung utama",
    start: new Date(2025, 8, 5, 8, 0),
    end: new Date(2025, 8, 5, 12, 0),
    duration: "4 jam",
  },
  {
    id: 2,
    title: "Dekorasi Venue",
    worker: "Siti Aisyah",
    task: "Penataan dekorasi & backdrop",
    start: new Date(2025, 8, 6, 9, 0),
    end: new Date(2025, 8, 6, 14, 0),
    duration: "5 jam",
  },
  {
    id: 3,
    title: "Sound System Check",
    worker: "Andi Wijaya",
    task: "Uji coba sound system & mic",
    start: new Date(2025, 8, 7, 10, 0),
    end: new Date(2025, 8, 7, 12, 0),
    duration: "2 jam",
  },
  {
    id: 4,
    title: "Logistik & Panggung",
    worker: "Rahmat Hidayat",
    task: "Pengangkutan alat & set panggung",
    start: new Date(2025, 8, 8, 7, 0),
    end: new Date(2025, 8, 8, 11, 0),
    duration: "4 jam",
  },
  {
    id: 5,
    title: "Acara Utama (Konser)",
    worker: "Semua Tim Lapangan",
    task: "Pengawasan acara & koordinasi klien",
    start: new Date(2025, 8, 13, 15, 0),
    end: new Date(2025, 8, 13, 23, 0),
    duration: "8 jam",
  },
];

export default function SchedulePage() {
  const [events] = useState(staticEvents);
  const router = useRouter();

  // Hitung analitik untuk card atas
  const totalWorkers = new Set(events.map((e) => e.worker)).size;
  const totalTasks = events.length;
  const completedTasks = 3; // contoh: 3 sudah selesai
  const completionRate = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="p-6 bg-gray-50 min-h-screen grid grid-cols-4 gap-4">
      {/* Card Utama (Analytics) */}
      <div className="col-span-3 space-y-4">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-800">
              Jadwal Pekerja
            </CardTitle>
            <Button
              className="bg-black text-white hover:bg-[#CDF463] hover:text-black transition-colors"
              onClick={() => router.push("/jadwal/create")}
            >
              + Create Jadwal
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Total Pekerja</p>
                <p className="text-2xl font-bold text-orange-500">
                  {totalWorkers}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Jumlah Task</p>
                <p className="text-2xl font-bold text-blue-500">{totalTasks}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Penyelesaian</p>
                <p className="text-2xl font-bold text-green-500">
                  {completionRate}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kalender */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Kalender Jadwal EO
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              views={["month", "week", "day"]}
              popup
              onSelectEvent={(event) =>
                router.push(`/jadwal/${event.id}/detail`)
              }
            />
          </CardContent>
        </Card>
      </div>

      {/* Card Samping */}
      <div className="col-span-1 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>At Work</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {events.map((event) => (
                <li
                  key={event.id}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded cursor-pointer hover:bg-blue-200"
                  onClick={() => router.push(`/jadwal/${event.id}/detail`)}
                >
                  {event.title} - {event.worker}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Info</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Setiap jadwal berisi informasi tentang nama pekerja, deskripsi
              tugas, serta estimasi durasi pengerjaan. Klik pada kalender atau
              daftar "At Work" untuk melihat detail jadwal secara lengkap.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
