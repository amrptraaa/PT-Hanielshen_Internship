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
  Legend,
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
    <div className="p-8 space-y-8 bg-gray-50 text-gray-900">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Jadwal */}
          <Card className="bg-white border border-gray-200 shadow-sm rounded-xl min-h-[110px]">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-gray-600 text-sm">Total Jadwal</p>
                <p className="text-3xl font-bold text-black mt-1">
                  {dashboardData.totalSchedules}
                </p>
              </div>
              <Calendar className="w-9 h-9 text-[#039155]" />
            </CardContent>
          </Card>

          {/* Total Workers */}
          <Card className="bg-white border border-gray-200 shadow-sm rounded-xl min-h-[110px]">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-gray-600 text-sm">Total Pekerja</p>
                <p className="text-3xl font-bold text-black mt-1">
                  {dashboardData.totalWorkers}
                </p>
              </div>
              <Users className="w-9 h-9 text-[#039155]" />
            </CardContent>
          </Card>

          {/* Attendance */}
          <Card className="bg-white border border-gray-200 shadow-sm rounded-xl min-h-[110px]">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-gray-600 text-sm">Absensi Bulan Ini</p>
                <p className="text-3xl font-bold text-black mt-1">
                  {dashboardData.attendanceRate}
                </p>
              </div>
              <ClipboardCheck className="w-9 h-9 text-[#039155]" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <Card className="bg-white border border-gray-200 shadow-sm rounded-xl min-h-[330px]">
            <CardHeader>
              <CardTitle>Jumlah Jadwal per Bulan</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={schedulePerMonth}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip contentStyle={{ borderRadius: 8 }} />
                  <Legend />
                  <Bar dataKey="jadwal" fill="#039155" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Line Chart */}
          <Card className="bg-white border border-gray-200 shadow-sm rounded-xl min-h-[330px]">
            <CardHeader>
              <CardTitle>Trend Absensi</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={attendanceTrend}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip contentStyle={{ borderRadius: 8 }} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="hadir"
                    stroke="#039155"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </AnimatedContent>

      {/* Recent Schedules */}
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
        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl min-h-[380px]">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Jadwal Terbaru</CardTitle>
            <Link href="/jadwal">
              <Button variant="outline" className="flex items-center gap-2">
                Lihat Semua <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.schedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="flex items-center justify-between border-b border-gray-200 pb-3"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {schedule.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {schedule.worker} • {schedule.date}
                    </p>
                  </div>
                  <Link
                    href={`/jadwal/${schedule.id}/detail`}
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
