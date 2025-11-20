// ============================================
// components/cifra/favorite-button.tsx
// ============================================
"use client";

import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { useFavorite } from "@/lib/hooks/use-favorite";
import { cn } from "@/lib/utils/cn";

interface FavoriteButtonProps {
  cifraId: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  showText?: boolean;
  className?: string;
}

export function FavoriteButton({
  cifraId,
  variant = "default",
  size = "default",
  showText = true,
  className,
}: FavoriteButtonProps) {
  const { isFavorite, isLoading, toggleFavorite } = useFavorite(cifraId);

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleFavorite}
      disabled={isLoading}
      className={cn(isFavorite && "text-red-500 hover:text-red-600", className)}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Heart
          className={cn(
            "h-5 w-5",
            showText && "mr-2",
            isFavorite && "fill-current"
          )}
        />
      )}
      {showText && (isFavorite ? "En Favoritos" : "Agregar a Favoritos")}
    </Button>
  );
}
