// src/app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Kembalikan hanya wadah kosong untuk anak-anaknya.
  // Ini mencegah layout global (dengan Sidebar/TopNav) diterapkan.
  return <>{children}</>;
}
