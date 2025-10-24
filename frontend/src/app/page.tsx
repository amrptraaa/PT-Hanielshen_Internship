"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MainRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/home");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">...</p>
    </div>
  );
}
