// ============================================
// components/cifra/cifra-header.tsx - ACTUALIZADO con rating
// ============================================
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart, Music } from "lucide-react";
import { RatingDisplay } from "@/components/cifra/rating-display";
import type { CifraWithArtist } from "@/types";

interface CifraHeaderProps {
  cifra: CifraWithArtist;
}

export function CifraHeader({ cifra }: CifraHeaderProps) {
  const difficultyColors = {
    easy: "bg-green-500/10 text-green-500 border-green-500/20",
    intermediate: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    hard: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  const difficultyLabels = {
    easy: "Fácil",
    intermediate: "Intermedio",
    hard: "Difícil",
  };

  const instrumentLabels = {
    guitar: "Guitarra",
    bass: "Bajo",
    ukulele: "Ukelele",
    piano: "Piano",
    drums: "Batería",
  };

  return (
    <div className="space-y-4">
      {/* Artista */}
      <Link
        href={`/artistas/${cifra.artist.slug}`}
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      >
        <Music className="h-4 w-4" />
        <span className="text-lg">{cifra.artist.name}</span>
      </Link>

      {/* Título */}
      <h1 className="text-4xl md:text-5xl font-bold">{cifra.title}</h1>

      {/* Badges y Stats */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Badges */}
        <div className="flex items-center gap-2">
          {cifra.difficulty && (
            <Badge className={difficultyColors[cifra.difficulty]}>
              {difficultyLabels[cifra.difficulty]}
            </Badge>
          )}
          <Badge variant="outline">Tom: {cifra.original_key}</Badge>
          <Badge variant="outline">{instrumentLabels[cifra.instrument]}</Badge>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{cifra.views_count.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span>{cifra.favorites_count.toLocaleString()}</span>
          </div>
          <RatingDisplay rating={cifra.rating} size="md" />
          <span className="text-xs">({cifra.ratings_count})</span>
        </div>
      </div>
    </div>
  );
}
