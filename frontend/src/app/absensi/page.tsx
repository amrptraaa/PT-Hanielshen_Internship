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

export default function AbsensiPage() {
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const router = useRouter();

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
    {
      id: 5,
      nama: "N. Karyawan",
      tanggal: "05/01/2025",
      masuk: "08.00",
      keluar: "17.00",
      status: "Hadir",
    },
    {
      id: 6,
      nama: "N. Karyawan",
      tanggal: "06/01/2025",
      masuk: "08.00",
      keluar: "17.00",
      status: "Ijin",
    },
    {
      id: 7,
      nama: "N. Karyawan",
      tanggal: "07/01/2025",
      masuk: "08.00",
      keluar: "17.00",
      status: "Alpha",
    },
    {
      id: 8,
      nama: "N. Karyawan",
      tanggal: "08/01/2025",
      masuk: "08.00",
      keluar: "17.00",
      status: "Hadir",
    },
  ];

  // Helper untuk badge status
  const StatusBadge = ({ status }: { status: string }) => {
    let color = "bg-gray-200 text-gray-700";
    if (status === "Hadir") color = "bg-green-100 text-green-600";
    if (status === "Ijin") color = "bg-yellow-100 text-yellow-600";
    if (status === "Alpha") color = "bg-red-100 text-red-600";

    return (
      <span className={`px-3 py-1 rounded-md text-sm font-medium ${color}`}>
        {status}
      </span>
    );
  };

  const handleDelete = (id: number) => {
    console.log("Hapus data dengan id:", id);
    // Di sini bisa ditambahkan logika hapus data dari API / state
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header dengan tombol Create */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Absensi Karyawan</h1>
        <Button
          className="bg-[#CDF463] text-black hover:bg-[#b5da55]"
          onClick={() => router.push("/absensi/create")}
        >
          <Plus className="mr-2 h-4 w-4" /> Create
        </Button>
      </div>

      {/* Tabel absensi */}
      <div className="rounded-md border bg-white shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Jam Masuk</TableHead>
              <TableHead>Jam Keluar</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {absensi.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.nama}</TableCell>
                <TableCell>{row.tanggal}</TableCell>
                <TableCell>{row.masuk}</TableCell>
                <TableCell>{row.keluar}</TableCell>
                <TableCell>
                  <StatusBadge status={row.status} />
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  {/* Delete pakai pop up */}
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
                          Data absensi dengan nama <b>{row.nama}</b> tanggal{" "}
                          <b>{row.tanggal}</b> akan dihapus secara permanen.
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
                    onClick={() => router.push(`/absensi/${row.id}/detail`)}
                  >
                    <Eye size={16} />
                  </Button>

                  {/* Edit */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-blue-500 border-blue-200 hover:bg-blue-100"
                    onClick={() => router.push(`/absensi/${row.id}/edit`)}
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
