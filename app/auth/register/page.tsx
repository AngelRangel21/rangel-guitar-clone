// ============================================
// app/auth/register/page.tsx
// ============================================
import { RegisterForm } from "@/components/auth/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrarse | CifraClub",
  description: "Crea tu cuenta en CifraClub",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
