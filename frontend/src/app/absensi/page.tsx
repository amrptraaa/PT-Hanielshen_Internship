"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AbsensiPage() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/absensi");
      const json = await res.json();
      setData(json.data || []);
    } catch (error) {
      console.error("Error fetch absensi:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Data Absensi</h1>
        <Link href="/absensi/create">
          <Button className="bg-green-500 text-white">Tambah Absensi</Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Masuk</TableHead>
            <TableHead>Keluar</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell>
                {item.nama_user || item.user_nama || item.nama || "Tidak Ada"}
              </TableCell>
              <TableCell>{item.tanggal}</TableCell>
              <TableCell>{item.jam_masuk}</TableCell>
              <TableCell>{item.jam_keluar}</TableCell>
              <TableCell>{item.status}</TableCell>

              <TableCell className="flex gap-2">
                <Link href={`/absensi/${item.id}/detail`}>
                  <Button variant="outline">Detail</Button>
                </Link>
                <Link href={`/absensi/${item.id}/edit`}>
                  <Button variant="outline">Edit</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
