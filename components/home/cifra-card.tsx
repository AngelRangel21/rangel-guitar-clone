// ============================================
// components/home/cifra-card.tsx - ACTUALIZADO con rating display
// ============================================
"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Eye } from "lucide-react";
import { FavoriteButton } from "@/components/cifra/favorite-button";
import { RatingDisplay } from "@/components/cifra/rating-display";
import type { CifraPreview } from "@/types";

interface CifraCardProps {
  cifra: CifraPreview;
}

export function CifraCard({ cifra }: CifraCardProps) {
  const difficultyColors = {
    easy: "bg-green-500/10 text-green-500",
    intermediate: "bg-yellow-500/10 text-yellow-500",
    hard: "bg-red-500/10 text-red-500",
  };

  const difficultyLabels = {
    easy: "Fácil",
    intermediate: "Intermedio",
    hard: "Difícil",
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header con artista y favorito */}
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/artistas/${cifra.artist.slug}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {cifra.artist.name}
            </Link>
            <FavoriteButton
              cifraId={cifra.id}
              variant="ghost"
              size="icon"
              showText={false}
              className="h-8 w-8 -mt-1"
            />
          </div>

          {/* Título */}
          <Link href={`/cifras/${cifra.id}`} className="block">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
              {cifra.title}
            </h3>
          </Link>

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {cifra.difficulty && (
              <Badge
                variant="outline"
                className={difficultyColors[cifra.difficulty]}
              >
                {difficultyLabels[cifra.difficulty]}
              </Badge>
            )}
            <Badge variant="outline">Tom: {cifra.original_key}</Badge>
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
            <RatingDisplay rating={cifra.rating} size="sm" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full">
          <Link href={`/cifras/${cifra.id}`}>Ver Cifra</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
