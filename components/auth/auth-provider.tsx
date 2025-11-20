// ============================================
// components/auth/auth-provider.tsx
// ============================================
"use client";

import { useAuth } from "@/lib/hooks/use-auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useAuth(); // Inicializa el estado de autenticación
  return <>{children}</>;
}
