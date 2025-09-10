"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DetailPekerjaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id; // ambil id pekerja dari URL

  const [pekerja, setPekerja] = useState<any>(null);

  // Simulasi fetch data pekerja
  useEffect(() => {
    if (id) {
      setPekerja({
        id,
        nama: "Nama Pekerja",
        email: "nama@gmail.com",
        nohp: "08123456789",
        jabatan: "Staff",
      });
    }
  }, [id]);

  if (!pekerja) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-lg shadow-md">
        <CardHeader>
          <CardTitle>Detail Pekerja</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">ID:</span>
            <span>{pekerja.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Nama:</span>
            <span>{pekerja.nama}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{pekerja.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">No Handphone:</span>
            <span>{pekerja.nohp}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Jabatan:</span>
            <span>{pekerja.jabatan}</span>
          </div>
        </CardContent>
        <div className="flex justify-end gap-2 p-4">
          <Button variant="outline" onClick={() => router.push("/pekerja")}>
            Kembali
          </Button>
          <Button
            className="bg-[#CDF463] text-black hover:bg-[#b5da55]"
            onClick={() => router.push(`/pekerja/${id}/edit`)}
          >
            Edit
          </Button>
        </div>
      </Card>
    </div>
  );
}
