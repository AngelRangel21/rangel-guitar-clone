// ============================================
// components/artist/artist-card.tsx
// ============================================
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Music2, CheckCircle } from "lucide-react";
import type { Artist } from "@/types";

interface ArtistCardProps {
  artist: Artist;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link href={`/artistas/${artist.slug}`}>
      <Card className="group hover:shadow-lg transition-all hover:scale-105">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-(--color-background)">
                <AvatarImage src={artist.image_url || ""} alt={artist.name} />
                <AvatarFallback className="text-2xl font-bold">
                  {artist.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {artist.verified && (
                <div className="absolute -bottom-1 -right-1 bg-(--color-background) rounded-full">
                  <CheckCircle className="h-6 w-6 text-blue-500" />
                </div>
              )}
            </div>

            {/* Name */}
            <div className="space-y-1 w-full">
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">
                {artist.name}
              </h3>
              {artist.country && (
                <p className="text-sm text-muted-foreground">
                  {artist.country}
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Music2 className="h-4 w-4" />
              <span>
                {artist.cifras_count}{" "}
                {artist.cifras_count === 1 ? "cifra" : "cifras"}
              </span>
            </div>

            {/* Genres */}
            {artist.genres && artist.genres.length > 0 && (
              <div className="flex flex-wrap gap-1 justify-center">
                {artist.genres.slice(0, 2).map((genre) => (
                  <Badge key={genre} variant="outline" className="text-xs">
                    {genre}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
