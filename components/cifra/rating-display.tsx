// ============================================
// components/cifra/rating-display.tsx - Solo mostrar, no interactivo
// ============================================
import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface RatingDisplayProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
}

export function RatingDisplay({
  rating,
  size = "sm",
  showNumber = true,
}: RatingDisplayProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div className="flex items-center gap-1">
      <Star
        className={cn(sizeClasses[size], "fill-yellow-400 text-yellow-400")}
      />
      {showNumber && (
        <span className="text-sm font-medium">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
