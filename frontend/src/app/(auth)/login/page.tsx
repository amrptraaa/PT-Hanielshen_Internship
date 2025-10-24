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
    <div className="flex h-screen">
      {/* Left side */}
      <div className="w-1/2 bg-gradient-to-b from-blue-500 to-blue-700 flex flex-col justify-center items-start px-16 text-white">
        <h1 className="text-4xl font-bold mb-2">PT HANIELSHEN</h1>
        <p className="text-lg">Event Organizer Scheduling & Presentation App</p>
      </div>

      {/* Right side */}
      <div className="w-1/2 bg-gray-100 flex flex-col justify-center items-center">
        <div className="w-3/4 max-w-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Hello Again!
          </h2>
          <p className="text-gray-500 mb-6">Welcome Back</p>

          <form onSubmit={handleLogin} className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
