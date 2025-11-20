// ============================================
// app/cifras/[id]/not-found.tsx
// ============================================
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container py-16">
      <div className="max-w-md mx-auto text-center space-y-6">
        <Music className="h-24 w-24 mx-auto text-muted-foreground" />
        <h1 className="text-4xl font-bold">Cifra no encontrada</h1>
        <p className="text-muted-foreground">
          Lo sentimos, la cifra que buscas no existe o ha sido eliminada.
        </p>
        <Button>
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  );
}
