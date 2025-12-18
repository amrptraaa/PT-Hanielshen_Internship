"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, Users, ClipboardCheck, ArrowRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  CartesianGrid,
} from "recharts";
import AnimatedContent from "@/components/AnimatedContent";

/* ================= TYPES ================= */

type Jadwal = {
  id: number;
  tanggal: string;
  keterangan: string;
  nama_user?: string;
  created_at?: string;
};

type Absensi = {
  id: number;
  tanggal: string;
  status: string;
};

type User = {
  id: number;
  nama: string;
};

/* ================= CONSTANT ================= */

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

/* ================= HELPER ================= */

const formatDate = (date: string) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

/* ================= PAGE ================= */

export default function DashboardPage() {
  const [jadwal, setJadwal] = useState<Jadwal[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [absensi, setAbsensi] = useState<Absensi[]>([]);

  const [jadwalPerMonth, setJadwalPerMonth] = useState<any[]>([]);
  const [absensiTrend, setAbsensiTrend] = useState<any[]>([]);
  const [attendanceRate, setAttendanceRate] = useState("0%");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [jadwalRes, userRes, absensiRes] = await Promise.all([
        api.get("/jadwal"),
        api.get("/users"),
        api.get("/absensi"),
      ]);

      setJadwal(jadwalRes.data || []);
      setUsers(userRes.data || []);
      setAbsensi(absensiRes.data || []);

      processCharts(jadwalRes.data || [], absensiRes.data || []);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  /* ================= DATA PROCESS ================= */

  const processCharts = (jadwalData: Jadwal[], absensiData: Absensi[]) => {
    const now = new Date();
    const currentMonth = now.getMonth();

    /* ===== BAR CHART (6 BULAN) ===== */
    const months = Array.from({ length: 6 }, (_, i) => {
      const index = (currentMonth - (5 - i) + 12) % 12;
      return { month: MONTHS[index], index, jadwal: 0 };
    });

    jadwalData.forEach((j) => {
      const m = new Date(j.tanggal).getMonth();
      const target = months.find((x) => x.index === m);
      if (target) target.jadwal++;
    });

    setJadwalPerMonth(months.map(({ month, jadwal }) => ({ month, jadwal })));

    /* ===== TREND ABSENSI ===== */
    const hadirData = months.map((m) => ({
      month: m.month,
      hadir: 0,
      index: m.index,
    }));

    absensiData.forEach((a) => {
      if (a.status.toLowerCase() === "hadir") {
        const m = new Date(a.tanggal).getMonth();
        const target = hadirData.find((x) => x.index === m);
        if (target) target.hadir++;
      }
    });

    setAbsensiTrend(
      hadirData.map(({ month, hadir }) => ({ month, hadir }))
    );

    /* ===== ABSENSI BULAN INI (%) ===== */
    const thisMonth = absensiData.filter(
      (a) => new Date(a.tanggal).getMonth() === currentMonth
    );

    const hadir = thisMonth.filter(
      (a) => a.status.toLowerCase() === "hadir"
    );

    const percent =
      thisMonth.length === 0
        ? 0
        : Math.round((hadir.length / thisMonth.length) * 100);

    setAttendanceRate(`${percent}%`);
  };

  /* ================= DERIVED ================= */

  const latestJadwal = [...jadwal]
    .sort(
      (a, b) =>
        new Date(b.created_at || b.tanggal).getTime() -
        new Date(a.created_at || a.tanggal).getTime()
    )
    .slice(0, 3);

  /* ================= UI ================= */

  return (
    <div className="p-8 space-y-8 bg-gray-50">
      {/* SUMMARY */}
      <AnimatedContent distance={100} direction="horizontal">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="flex justify-between p-6">
              <div>
                <p className="text-sm text-gray-600">Total Jadwal</p>
                <p className="text-3xl font-bold">{jadwal.length}</p>
              </div>
              <Calendar className="w-9 h-9 text-[#039155]" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex justify-between p-6">
              <div>
                <p className="text-sm text-gray-600">Total Pekerja</p>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>
              <Users className="w-9 h-9 text-[#039155]" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex justify-between p-6">
              <div>
                <p className="text-sm text-gray-600">Absensi Bulan Ini</p>
                <p className="text-3xl font-bold">{attendanceRate}</p>
              </div>
              <ClipboardCheck className="w-9 h-9 text-[#039155]" />
            </CardContent>
          </Card>
        </div>
      </AnimatedContent>

      {/* CHART */}
      <AnimatedContent distance={150} direction="vertical">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Jumlah Jadwal per Bulan</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={jadwalPerMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="jadwal" fill="#039155" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trend Absensi</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={absensiTrend}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="hadir" stroke="#039155" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </AnimatedContent>

      {/* JADWAL TERBARU */}
      <AnimatedContent distance={120} direction="vertical">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Jadwal Terbaru</CardTitle>
            <Link href="/jadwal">
              <Button variant="outline">
                Lihat Semua <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {latestJadwal.map((j) => (
                <div
                  key={j.id}
                  className="flex justify-between border-b border-gray-200 pb-3"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {j.keterangan}
                    </p>
                    <p className="text-sm text-gray-600">
                      {j.nama_user || "-"} • {formatDate(j.tanggal)}
                    </p>
                  </div>
                  <Link
                    href={`/jadwal/${j.id}/detail`}
                    className="text-[#039155] hover:underline text-sm"
                  >
                    Detail
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </AnimatedContent>
    </div>
  );
}
