"use client";

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
} from "recharts";
import AnimatedContent from "@/components/AnimatedContent";

// Dummy data
const dashboardData = {
  totalSchedules: 24,
  totalWorkers: 18,
  attendanceRate: "92%",
  schedules: [
    {
      id: "J001",
      name: "Pemasangan Lighting",
      worker: "Budi Santoso",
      date: "10 Sep 2025",
    },
    {
      id: "J002",
      name: "Sound Check",
      worker: "Siti Aisyah",
      date: "11 Sep 2025",
    },
    {
      id: "J003",
      name: "Dekorasi Venue",
      worker: "Tim Lapangan",
      date: "12 Sep 2025",
    },
  ],
};

// Dummy chart data
const schedulePerMonth = [
  { month: "Jan", jadwal: 3 },
  { month: "Feb", jadwal: 5 },
  { month: "Mar", jadwal: 4 },
  { month: "Apr", jadwal: 6 },
  { month: "May", jadwal: 2 },
  { month: "Jun", jadwal: 7 },
];

const attendanceTrend = [
  { month: "Jan", hadir: 85 },
  { month: "Feb", hadir: 90 },
  { month: "Mar", hadir: 87 },
  { month: "Apr", hadir: 92 },
  { month: "May", hadir: 95 },
  { month: "Jun", hadir: 93 },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Top Summary */}
      <AnimatedContent
        distance={100}
        direction="horizontal"
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1.05}
        threshold={0.2}
        delay={0.2}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="opacity-80">Total Jadwal</p>
                <p className="text-2xl font-bold">
                  {dashboardData.totalSchedules}
                </p>
              </div>
              <Calendar className="w-8 h-8 opacity-80" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-700 text-white shadow-md">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="opacity-80">Total Pekerja</p>
                <p className="text-2xl font-bold">
                  {dashboardData.totalWorkers}
                </p>
              </div>
              <Users className="w-8 h-8 opacity-80" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-md">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="opacity-80">Absensi Bulan Ini</p>
                <p className="text-2xl font-bold">
                  {dashboardData.attendanceRate}
                </p>
              </div>
              <ClipboardCheck className="w-8 h-8 opacity-80" />
            </CardContent>
          </Card>
        </div>
      </AnimatedContent>

      {/* Chart Section */}
      <AnimatedContent
        distance={150}
        direction="vertical"
        duration={1}
        ease="power4.out"
        initialOpacity={0.1}
        animateOpacity
        scale={1.05}
        threshold={0.3}
        delay={0.3}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Jumlah Jadwal per Bulan</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={schedulePerMonth}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="jadwal" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Trend Absensi</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={attendanceTrend}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="hadir"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </AnimatedContent>

      {/* Recent Schedule Section */}
      <AnimatedContent
        distance={120}
        direction="vertical"
        reverse
        duration={1.2}
        ease="bounce.out"
        initialOpacity={0.2}
        animateOpacity
        scale={1.05}
        threshold={0.2}
        delay={0.4}
      >
        <Card className="shadow-sm">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Jadwal Terbaru</CardTitle>
            <Link href="/jadwal">
              <Button variant="outline" className="flex items-center gap-2">
                Lihat Semua <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData.schedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-semibold">{schedule.name}</p>
                    <p className="text-sm text-gray-500">
                      {schedule.worker} • {schedule.date}
                    </p>
                  </div>
                  <Link
                    href={`/jadwal/${schedule.id}/detail`}
                    className="text-blue-600 hover:underline text-sm"
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
