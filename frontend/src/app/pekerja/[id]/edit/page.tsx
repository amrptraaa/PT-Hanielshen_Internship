"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EditPekerjaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id; // ambil ID dari URL

  // state form
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [nohp, setNohp] = useState("");
  const [jabatan, setJabatan] = useState("");

  // simulasi fetch data pekerja by ID
  useEffect(() => {
    if (id) {
      // dummy data
      setNama("Nama Pekerja");
      setEmail("nama@gmail.com");
      setNohp("08123456789");
      setJabatan("Staff");
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Update pekerja:", { id, nama, email, nohp, jabatan });
    // TODO: panggil API update pekerja
    router.push("/pekerja");
  };

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Edit Data Pekerja</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="nama">Nama</Label>
              <Input
                id="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukkan nama pekerja"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email pekerja"
                required
              />
            </div>
            <div>
              <Label htmlFor="nohp">No Handphone</Label>
              <Input
                id="nohp"
                value={nohp}
                onChange={(e) => setNohp(e.target.value)}
                placeholder="Masukkan nomor HP"
                required
              />
            </div>
            <div>
              <Label htmlFor="jabatan">Jabatan</Label>
              <Input
                id="jabatan"
                value={jabatan}
                onChange={(e) => setJabatan(e.target.value)}
                placeholder="Masukkan jabatan pekerja"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/pekerja")}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-[#CDF463] text-black hover:bg-[#b5da55]"
            >
              Simpan Perubahan
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
