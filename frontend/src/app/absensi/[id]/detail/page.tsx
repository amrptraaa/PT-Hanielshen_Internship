"use client";

import { useParams } from "next/navigation";

export default function AbsensiDetailPage() {
  const { id } = useParams();

  // Data statis absensi
  const absensi = [
    {
      id: 1,
      nama: "N. Karyawan",
      tanggal: "01/01/2025",
      masuk: "08.00",
      keluar: "17.00",
      status: "Hadir",
    },
    {
      id: 2,
      nama: "N. Karyawan",
      tanggal: "02/01/2025",
      masuk: "08.00",
      keluar: "17.00",
      status: "Hadir",
    },
    {
      id: 3,
      nama: "N. Karyawan",
      tanggal: "03/01/2025",
      masuk: "08.00",
      keluar: "17.00",
      status: "Ijin",
    },
    {
      id: 4,
      nama: "N. Karyawan",
      tanggal: "04/01/2025",
      masuk: "08.00",
      keluar: "17.00",
      status: "Alpha",
    },
  ];

  // Cari data berdasarkan id
  const data = absensi.find((row) => row.id === Number(id));

  if (!data) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Data tidak ditemukan</h1>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Detail Absensi</h1>
      <div className="rounded-md border bg-white shadow-md p-6 space-y-3">
        <p>
          <span className="font-medium">ID:</span> {data.id}
        </p>
        <p>
          <span className="font-medium">Nama:</span> {data.nama}
        </p>
        <p>
          <span className="font-medium">Tanggal:</span> {data.tanggal}
        </p>
        <p>
          <span className="font-medium">Jam Masuk:</span> {data.masuk}
        </p>
        <p>
          <span className="font-medium">Jam Keluar:</span> {data.keluar}
        </p>
        <p>
          <span className="font-medium">Status:</span>{" "}
          <span
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              data.status === "Hadir"
                ? "bg-green-100 text-green-600"
                : data.status === "Ijin"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {data.status}
          </span>
        </p>
      </div>
    </div>
  );
}
