// ============================================
// app/artistas/[slug]/page.tsx - Perfil de artista
// ============================================
import { notFound } from "next/navigation";
import { ArtistService } from "@/lib/services/artist.service";
import { ArtistHeader } from "@/components/artist/artist-header";
import { CifraCard } from "@/components/home/cifra-card";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Music2 } from "lucide-react";
import type { Metadata } from "next";

interface ArtistPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ArtistPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = await ArtistService.getBySlug(slug);

  if (!artist) {
    return {
      title: "Artista no encontrado",
    };
  }

  return {
    title: `${artist.name} - Cifras | CifraClub`,
    description: `Todas las cifras de ${artist.name}. ${artist.cifras_count} canciones disponibles con acordes y letras completas.`,
  };
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { slug } = await params;
  const artist = await ArtistService.getBySlug(slug);

  if (!artist) {
    notFound();
  }

  // Separar cifras más populares
  const popularCifras = artist.cifras.slice(0, 4);
  const otherCifras = artist.cifras.slice(4);

  return (
    <div className="container py-8">
      <div className="space-y-8">
        {/* Header del artista */}
        <ArtistHeader artist={artist} />

        <Separator />

        {/* Cifras más populares */}
        {popularCifras.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Music2 className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Cifras Más Populares</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularCifras.map((cifra) => (
                <CifraCard key={cifra.id} cifra={cifra} />
              ))}
            </div>
          </div>
        )}

        {/* Todas las cifras */}
        {otherCifras.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Todas las Cifras</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherCifras.map((cifra) => (
                <CifraCard key={cifra.id} cifra={cifra} />
              ))}
            </div>
          </div>
        )}

        {/* Sin cifras */}
        {artist.cifras.length === 0 && (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <Music2 className="h-16 w-16 mx-auto text-muted-foreground" />
              <h2 className="text-2xl font-bold">Aún no hay cifras</h2>
              <p className="text-muted-foreground">
                Este artista aún no tiene cifras disponibles
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
