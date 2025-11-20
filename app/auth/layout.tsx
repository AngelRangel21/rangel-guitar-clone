// ============================================
// app/auth/layout.tsx
// ============================================
import { Music } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2">
          <Music className="h-8 w-8 text-primary" />
          <span className="font-bold text-2xl">CifraClub</span>
        </Link>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
