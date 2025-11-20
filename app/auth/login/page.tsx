// ============================================
// app/auth/login/page.tsx
// ============================================
import { LoginForm } from "@/components/auth/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión | CifraClub",
  description: "Inicia sesión en tu cuenta",
};

export default function LoginPage() {
  return <LoginForm />;
}
