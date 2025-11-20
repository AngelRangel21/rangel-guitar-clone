// ============================================
// components/cifra/rating-stars.tsx
// ============================================
"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useRating } from "@/lib/hooks/use-rating";

interface RatingStarsProps {
  cifraId: string;
  averageRating: number;
  totalRatings: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  showCount?: boolean;
}

export function RatingStars({
  cifraId,
  averageRating,
  totalRatings,
  size = "md",
  interactive = true,
  showCount = true,
}: RatingStarsProps) {
  const { userRating, isLoading, hoverRating, setHoverRating, rate } =
    useRating(cifraId);

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const displayRating = hoverRating || userRating || averageRating;

  return (
    <div className="space-y-3">
      {/* Estrellas */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= displayRating;
          const isPartiallyFilled =
            star === Math.ceil(displayRating) && displayRating % 1 !== 0;

          return (
            <button
              key={star}
              onClick={() => interactive && rate(star)}
              onMouseEnter={() => interactive && setHoverRating(star)}
              onMouseLeave={() => interactive && setHoverRating(null)}
              disabled={!interactive || isLoading}
              className={cn(
                "transition-all",
                interactive && "hover:scale-110 cursor-pointer",
                !interactive && "cursor-default",
                isLoading && "opacity-50 cursor-wait"
              )}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  "transition-colors",
                  isFilled && "fill-yellow-400 text-yellow-400",
                  !isFilled && "text-[var(--color-muted-foreground)]",
                  isPartiallyFilled && "fill-yellow-400/50 text-yellow-400"
                )}
              />
            </button>
          );
        })}
      </div>

      {/* Información */}
      <div className="text-sm text-[var(--color-muted-foreground)]">
        {userRating ? (
          <p>
            Tu calificación:{" "}
            <span className="font-semibold text-[var(--color-foreground)]">
              {userRating}
            </span>{" "}
            {userRating === 1 ? "estrella" : "estrellas"}
          </p>
        ) : interactive ? (
          <p>Haz click para calificar</p>
        ) : null}

        {showCount && (
          <p className="mt-1">
            Promedio:{" "}
            <span className="font-semibold text-[var(--color-foreground)]">
              {averageRating.toFixed(1)}
            </span>{" "}
            ({totalRatings}{" "}
            {totalRatings === 1 ? "calificación" : "calificaciones"})
          </p>
        )}
      </div>
    </div>
  );
}
