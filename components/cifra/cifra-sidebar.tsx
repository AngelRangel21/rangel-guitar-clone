// ============================================
// components/cifra/cifra-sidebar.tsx - ACTUALIZADO
// ============================================
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FavoriteButton } from "@/components/cifra/favorite-button";
import { RatingStars } from "@/components/cifra/rating-stars";
import { Share2, Printer, Flag, Download } from "lucide-react";
import type { CifraWithArtist } from "@/types";
import Link from "next/link";

interface CifraSidebarProps {
  cifra: CifraWithArtist;
}

export function CifraSidebar({ cifra }: CifraSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Acciones principales */}
      <Card>
        <CardContent className="p-4 space-y-2">
          {/* Botón de favoritos */}
          <FavoriteButton cifraId={cifra.id} className="w-full" size="lg" />

          <Button variant="outline" className="w-full">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir
          </Button>
          <Button variant="outline" className="w-full">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Descargar PDF
          </Button>
        </CardContent>
      </Card>

      {/* Calificación */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Califica esta cifra</CardTitle>
        </CardHeader>
        <CardContent>
          <RatingStars
            cifraId={cifra.id}
            averageRating={cifra.rating}
            totalRatings={cifra.ratings_count}
            size="lg"
            interactive={true}
            showCount={true}
          />
        </CardContent>
      </Card>

      {/* Info del artista */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sobre el artista</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link
            href={`/artistas/${cifra.artist.slug}`}
            className="flex items-center gap-3 group"
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src={cifra.artist.image_url || ""} />
              <AvatarFallback>
                {cifra.artist.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold group-hover:text-primary transition-colors">
                {cifra.artist.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {cifra.artist.cifras_count} cifras
              </p>
            </div>
          </Link>
          <Button variant="outline" className="w-full">
            <Link href={`/artistas/${cifra.artist.slug}`}>
              Ver todas las cifras
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Video (si existe) */}
      {cifra.has_video && cifra.video_url && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Video Tutorial</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-(--color-muted) rounded-lg flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Video tutorial</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Separator />

      {/* Reportar */}
      <Button
        variant="ghost"
        size="sm"
        className="w-full text-muted-foreground"
      >
        <Flag className="h-4 w-4 mr-2" />
        Reportar error
      </Button>
    </div>
  );
}
