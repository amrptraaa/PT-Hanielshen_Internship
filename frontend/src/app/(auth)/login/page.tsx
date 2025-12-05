"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "admin@hanielshen.id" && password === "admin123") {
      router.push("/home");
    } else {
      setError("Email atau password salah");
    }
  };

  return (
    // ✅ Hilangkan margin default, gunakan min-h-screen + bg penuh
    <div className="flex h-full bg-[#039155] text-black font-sans">
      {/* Left side - Branding */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start px-10 sm:px-16">
        <div className="max-w-md">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">PT HANIELSHEN</h1>
          <p className="text-base sm:text-lg opacity-90">
            Event Organizer Scheduling & Presentation App
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 bg-[#f8f9fa] flex flex-col justify-center items-center p-4 sm:p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Selamat Datang!</h2>
            <p className="opacity-80 mt-2">Silakan masuk ke akun Anda</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-base border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/30 focus:border-transparent bg-white"
                autoComplete="email"
                suppressHydrationWarning={true}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Masukkan password Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-base border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/30 focus:border-transparent bg-white"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="text-red-700 text-sm font-medium bg-red-100 px-3 py-2 rounded-lg border border-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#039155] text-black font-semibold py-3 px-4 rounded-lg text-base border border-black/20 transition hover:bg-[#28A771] shadow-sm"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
