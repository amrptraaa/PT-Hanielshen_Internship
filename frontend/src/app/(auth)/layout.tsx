// src/app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="m-0 p-0 h-screen w-screen bg-[#CDF463]">{children}</div>
  );
}
