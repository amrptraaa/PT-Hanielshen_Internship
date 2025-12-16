"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AbsensiDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/absensi/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;

  if (!data)
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Data tidak ditemukan</h1>
      </div>
    );

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Detail Absensi</h1>

      <div className="rounded-md border bg-white shadow-md p-6 space-y-3">
        <p><span className="font-medium">ID:</span> {data.id}</p>

        <p>
          <span className="font-medium">Nama:</span>{" "}
          {data.nama_user || data.user_nama || data.nama || "Tidak Ada"}
        </p>

        <p><span className="font-medium">Tanggal:</span> {data.tanggal}</p>
        <p><span className="font-medium">Jam Masuk:</span> {data.jam_masuk}</p>
        <p><span className="font-medium">Jam Keluar:</span> {data.jam_keluar}</p>

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
