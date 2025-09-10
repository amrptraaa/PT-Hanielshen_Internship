"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Edit2, Trash2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
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

export default function PekerjaPage() {
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const router = useRouter();

  // Data statis pekerja
  const pekerja = [
    {
      id: 1,
      nama: "N. Pekerja",
      email: "nama@gmail.com",
      nohp: "08xxxxxxxxxx",
      jabatan: "J. Pekerja",
    },
    {
      id: 2,
      nama: "N. Pekerja",
      email: "nama@gmail.com",
      nohp: "08xxxxxxxxxx",
      jabatan: "J. Pekerja",
    },
    {
      id: 3,
      nama: "N. Pekerja",
      email: "nama@gmail.com",
      nohp: "08xxxxxxxxxx",
      jabatan: "J. Pekerja",
    },
    {
      id: 4,
      nama: "N. Pekerja",
      email: "nama@gmail.com",
      nohp: "08xxxxxxxxxx",
      jabatan: "J. Pekerja",
    },
    {
      id: 5,
      nama: "N. Pekerja",
      email: "nama@gmail.com",
      nohp: "08xxxxxxxxxx",
      jabatan: "J. Pekerja",
    },
    {
      id: 6,
      nama: "N. Pekerja",
      email: "nama@gmail.com",
      nohp: "08xxxxxxxxxx",
      jabatan: "J. Pekerja",
    },
    {
      id: 7,
      nama: "N. Pekerja",
      email: "nama@gmail.com",
      nohp: "08xxxxxxxxxx",
      jabatan: "J. Pekerja",
    },
    {
      id: 8,
      nama: "N. Pekerja",
      email: "nama@gmail.com",
      nohp: "08xxxxxxxxxx",
      jabatan: "J. Pekerja",
    },
  ];

  const handleDelete = (id: number) => {
    console.log("Hapus data pekerja id:", id);
    // Tambahkan logic hapus API/state
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header dengan tombol Create */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Data Pekerja</h1>
        <Button
          className="bg-[#CDF463] text-black hover:bg-[#b5da55]"
          onClick={() => router.push("/pekerja/create")}
        >
          <Plus className="mr-2 h-4 w-4" /> Create
        </Button>
      </div>

      {/* Tabel pekerja */}
      <div className="rounded-md border bg-white shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>No Handphone</TableHead>
              <TableHead>Jabatan</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pekerja.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.nama}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.nohp}</TableCell>
                <TableCell>{row.jabatan}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  {/* Delete */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 border-red-200 hover:bg-red-100"
                        onClick={() => setDeleteId(row.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Apakah Anda yakin ingin menghapus data ini?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Data pekerja <b>{row.nama}</b> akan dihapus secara
                          permanen.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => handleDelete(row.id)}
                        >
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  {/* Detail */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-gray-500 border-gray-200 hover:bg-gray-100"
                    onClick={() => router.push(`/pekerja/${row.id}/detail`)}
                  >
                    <Eye size={16} />
                  </Button>

                  {/* Edit */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-blue-500 border-blue-200 hover:bg-blue-100"
                    onClick={() => router.push(`/pekerja/${row.id}/edit`)}
                  >
                    <Edit2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <Button
          variant="outline"
          className="w-10 h-10 rounded-full"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          &lt;
        </Button>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <Button
            key={num}
            variant={page === num ? "default" : "outline"}
            className={`w-10 h-10 rounded-full ${
              page === num ? "bg-[#CDF463] text-black" : ""
            }`}
            onClick={() => setPage(num)}
          >
            {num}
          </Button>
        ))}
        <Button
          variant="outline"
          className="w-10 h-10 rounded-full"
          onClick={() => setPage((p) => p + 1)}
        >
          &gt;
        </Button>
      </div>
    </div>
  );
}
