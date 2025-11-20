// ============================================
// components/search/search-results.tsx
// ============================================
"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, TrendingUp } from "lucide-react";
import type { CifraPreview } from "@/types";

interface SearchResultsProps {
  results: CifraPreview[];
  query: string;
  onSelect?: () => void;
}

export function SearchResults({
  results,
  query,
  onSelect,
}: SearchResultsProps) {
  return (
    <Card className="absolute top-full mt-2 w-full max-h-[400px] overflow-y-auto z-50 shadow-lg">
      <div className="p-2">
        {results.map((result) => (
          <Link
            key={result.id}
            href={`/cifras/${result.id}`}
            onClick={onSelect}
            className="block p-3 hover:bg-(--color-accent) rounded-md transition-colors">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Music className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{result.title}</div>
                <div className="text-sm text-muted-foreground truncate">
                  {result.artist.name}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {result.original_key}
                  </Badge>
                  {result.difficulty && (
                    <Badge variant="outline" className="text-xs">
                      {result.difficulty === "easy"
                        ? "Fácil"
                        : result.difficulty === "intermediate"
                          ? "Intermedio"
                          : "Difícil"}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span>{result.views_count}</span>
              </div>
            </div>
          </Link>
        ))}

        {results.length > 0 && (
          <Link
            href={`/buscar?q=${encodeURIComponent(query)}`}
            onClick={onSelect}
            className="block p-3 text-center text-sm text-primary hover:underline">
            Ver todos los resultados
          </Link>
        )}
      </div>
    </Card>
  );
}
