// ============================================
// components/admin/admin-guard.tsx - Proteger rutas admin
// ============================================
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/lib/hooks/use-admin";
import { useAuthStore } from "@/lib/stores/auth-store";
import { Loader2 } from "lucide-react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAdmin } = useAdmin();
  const { isLoading, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    } else if (!isLoading && isAuthenticated && !isAdmin) {
      router.push("/");
    }
  }, [isLoading, isAuthenticated, isAdmin, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
}
