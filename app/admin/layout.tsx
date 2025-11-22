// ============================================
// app/admin/layout.tsx - Layout del admin
// ============================================
import Link from "next/link";
import { Music, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminNav } from "@/components/admin/admin-nav";
import { AdminGuard } from "@/components/admin/admin-guard";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Panel de Administración | CifraClub",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 z-50 w-64 border-r bg-[var(--color-background)]">
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center gap-2 border-b px-6">
              <Music className="h-6 w-6 text-[var(--color-primary)]" />
              <span className="font-bold text-lg">Admin Panel</span>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-4">
              <AdminNav />
            </div>

            {/* Footer */}
            <div className="border-t p-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al sitio
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="pl-64">
          <main className="p-8">{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
}
