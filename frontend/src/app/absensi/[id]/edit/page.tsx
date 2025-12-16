"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function AbsensiEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    tanggal: "",
    jam_masuk: "",
    jam_keluar: "",
    status: "Hadir",
  });

  const [loading, setLoading] = useState(true);

  // =========================
  // GET DATA BY ID
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/absensi/${id}`);
        const json = await res.json();

        if (json.data) {
          setFormData({
            tanggal: json.data.tanggal,
            jam_masuk: json.data.masuk,
            jam_keluar: json.data.keluar,
            status: json.data.status,
          });
        }

        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // =========================
  // HANDLE SUBMIT UPDATE
  // =========================
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/absensi/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tanggal: formData.tanggal,
          jam_masuk: formData.jam_masuk,
          jam_keluar: formData.jam_keluar,
          status: formData.status,
        }),
      });

      const json = await res.json();

      if (res.ok) {
        alert("Berhasil update absensi!");
        router.push("/absensi");
      } else {
        alert(json.message || "Gagal update data");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Terjadi kesalahan koneksi ke server");
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Edit Absensi</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Tanggal</label>
          <input
            type="date"
            name="tanggal"
            className="w-full border px-3 py-2 rounded-md"
            value={formData.tanggal}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Jam Masuk</label>
          <input
            type="time"
            name="jam_masuk"
            className="w-full border px-3 py-2 rounded-md"
            value={formData.jam_masuk}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Jam Keluar</label>
          <input
            type="time"
            name="jam_keluar"
            className="w-full border px-3 py-2 rounded-md"
            value={formData.jam_keluar}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            className="w-full border px-3 py-2 rounded-md"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Hadir">Hadir</option>
            <option value="Ijin">Ijin</option>
            <option value="Sakit">Sakit</option>
            <option value="Alpha">Alpha</option>
          </select>
        </div>

        <Button type="submit" className="bg-blue-600 text-white w-full">
          Update Absensi
        </Button>
      </form>
    </div>
  );
}
