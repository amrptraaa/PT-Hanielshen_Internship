"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function fetchHello() {
  return { message: "Sistem siap digunakan 🚀" };
}

export default function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["hello"],
    queryFn: fetchHello,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-4xl shadow-md border ">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-5xl font-extrabold text-black">
            Selamat datang Dashboard Management Pekerja
          </CardTitle>
          <p className="text-gray-600 text-lg">
            Kelola data pekerja & absensi dengan mudah dan modern
          </p>
        </CardHeader>
        <CardContent className="text-center text-gray-700 font-medium">
          {data?.message}
        </CardContent>
      </Card>
    </div>
  );
}
