// ============================================
// app/artistas/page.tsx - Lista de artistas
// ============================================
"use client";

import { useEffect, useMemo, useState } from "react";
import { ArtistService } from "@/lib/services/artist.service";
import { ArtistCard } from "@/components/artist/artist-card";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Users } from "lucide-react";
import type { Artist } from "@/types";

export default function ArtistasPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    ArtistService.getPopular(100)
      .then((data) => {
        setArtists(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Filtrar artistas por búsqueda (computado)
  const filteredArtists = useMemo(() => {
    if (searchQuery.trim() === "") {
      return artists;
    }
    return artists.filter((artist) =>
      artist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, artists]);

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8 space-y-6">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Artistas</h1>
        </div>

        {/* Search */}
        <div className="max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar artistas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats */}
        <p className="text-muted-foreground">
          {isLoading
            ? "Cargando..."
            : `${filteredArtists.length} ${filteredArtists.length === 1 ? "artista encontrado" : "artistas encontrados"}`}
        </p>
      </div>

      {/* Artists Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(20)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      ) : filteredArtists.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <Users className="h-16 w-16 mx-auto text-muted-foreground" />
            <h2 className="text-2xl font-bold">No se encontraron artistas</h2>
            <p className="text-muted-foreground">
              No hay artistas que coincidan con tu búsqueda
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
