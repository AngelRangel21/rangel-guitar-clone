// ============================================
// app/auth/forgot-password/page.tsx
// ============================================
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recuperar Contraseña | CifraClub",
  description: "Recupera tu contraseña",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
