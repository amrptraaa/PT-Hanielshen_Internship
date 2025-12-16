"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login gagal");
        setLoading(false);
        return;
      }

      // ✅ Simpan token (localStorage)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Redirect setelah login
      router.push("/home");
    } catch (err) {
      console.error(err);
      setError("Tidak dapat terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full bg-[#039155] text-black font-sans">
      {/* Left */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start px-10 sm:px-16">
        <div className="max-w-md">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            PT HANIELSHEN
          </h1>
          <p className="text-base sm:text-lg opacity-90">
            Event Organizer Scheduling & Presentation App
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="w-full md:w-1/2 bg-[#f8f9fa] flex flex-col justify-center items-center p-4 sm:p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Selamat Datang!</h2>
            <p className="opacity-80 mt-2">Silakan masuk ke akun Anda</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="text-red-700 bg-red-100 px-3 py-2 rounded">
                {error}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#039155] py-3 rounded-lg font-semibold hover:bg-[#28A771]"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
