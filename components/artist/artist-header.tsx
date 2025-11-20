// ============================================
// components/artist/artist-header.tsx
// ============================================
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MapPin, Music2, Eye } from "lucide-react";
import type { Artist } from "@/types";

interface ArtistHeaderProps {
  artist: Artist;
}

export function ArtistHeader({ artist }: ArtistHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Header con avatar y nombre */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          <Avatar className="h-32 w-32 border-4 border-(--color-border)">
            <AvatarImage src={artist.image_url || ""} alt={artist.name} />
            <AvatarFallback className="text-4xl font-bold">
              {artist.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {artist.verified && (
            <div className="absolute -bottom-2 -right-2 bg-(--color-background) rounded-full p-1">
              <CheckCircle className="h-8 w-8 text-blue-500" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl md:text-5xl font-bold">{artist.name}</h1>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            {artist.country && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{artist.country}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Music2 className="h-4 w-4" />
              <span>
                {artist.cifras_count}{" "}
                {artist.cifras_count === 1 ? "cifra" : "cifras"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{artist.views_count.toLocaleString()} vistas</span>
            </div>
          </div>

          {/* Genres */}
          {artist.genres && artist.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {artist.genres.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bio */}
      {artist.bio && (
        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground">{artist.bio}</p>
        </div>
      )}
    </div>
  );
}
