// ============================================
// app/artistas/[slug]/not-found.tsx
// ============================================
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export default function ArtistNotFound() {
  return (
    <div className="container py-16">
      <div className="max-w-md mx-auto text-center space-y-6">
        <Users className="h-24 w-24 mx-auto text-muted-foreground" />
        <h1 className="text-4xl font-bold">Artista no encontrado</h1>
        <p className="text-muted-foreground">
          Lo sentimos, el artista que buscas no existe o ha sido eliminado.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/artistas">Ver todos los artistas</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
