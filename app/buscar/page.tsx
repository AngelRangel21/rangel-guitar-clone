// ============================================
// app/buscar/page.tsx - Página de búsqueda completa
// ============================================
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense, startTransition } from "react";
import { SearchService } from "@/lib/services/search.service";
import { CifraCard } from "@/components/home/cifra-card";
import { SearchBar } from "@/components/search/search-bar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import type { CifraPreview, Difficulty, Instrument } from "@/types";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const difficultyParam = searchParams.get("difficulty") as Difficulty | null;
  const instrumentParam = searchParams.get("instrument") as Instrument | null;

  const [results, setResults] = useState<CifraPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty | null>(difficultyParam);
  const [selectedInstrument, setSelectedInstrument] =
    useState<Instrument | null>(instrumentParam);

  useEffect(() => {
    let mounted = true;

    const runSearch = async () => {
      if (!query) {
        if (mounted) {
          setResults([]);
          setLoading(false);
        }
        return;
      }

      // Mark the update as non-urgent to avoid cascading renders when
      // updating state from an effect.
      startTransition(() => setLoading(true));

      try {
        const data = await SearchService.simpleSearch(query, 50);
        if (!mounted) return;

        let filtered = data as CifraPreview[];

        // Filtrar por dificultad
        if (selectedDifficulty) {
          filtered = filtered.filter(
            (c) => c.difficulty === selectedDifficulty
          );
        }

        setResults(filtered);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    runSearch();

    return () => {
      mounted = false;
    };
  }, [query, selectedDifficulty, selectedInstrument]);

  const clearFilters = () => {
    setSelectedDifficulty(null);
    setSelectedInstrument(null);
  };

  const hasFilters = selectedDifficulty || selectedInstrument;

  return (
    <div className="container py-8">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar
          placeholder="Buscar cifras, artistas..."
          showResults={false}
        />
      </div>

      {/* Query Display */}
      {query && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Resultados para: <span className="text-primary">{query}</span>
          </h1>
          <p className="text-muted-foreground">
            {loading ? "Buscando..." : `${results.length} cifras encontradas`}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
        {/* Filtros */}
        <aside className="space-y-6">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Filtros</h3>
              {hasFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-8 text-xs">
                  <X className="h-3 w-3 mr-1" />
                  Limpiar
                </Button>
              )}
            </div>

            {/* Dificultad */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Dificultad</h4>
              <div className="space-y-2">
                {(["easy", "intermediate", "hard"] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() =>
                      setSelectedDifficulty(
                        selectedDifficulty === diff ? null : diff
                      )
                    }
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedDifficulty === diff
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-(--color-accent)"
                    }`}>
                    {diff === "easy"
                      ? "Fácil"
                      : diff === "intermediate"
                        ? "Intermedio"
                        : "Difícil"}
                  </button>
                ))}
              </div>
            </div>

            {/* Instrumento */}
            <div className="space-y-3 mt-6">
              <h4 className="text-sm font-medium">Instrumento</h4>
              <div className="space-y-2">
                {(["guitar", "bass", "ukulele", "piano"] as const).map(
                  (inst) => (
                    <button
                      key={inst}
                      onClick={() =>
                        setSelectedInstrument(
                          selectedInstrument === inst ? null : inst
                        )
                      }
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedInstrument === inst
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-(--color-accent)"
                      }`}>
                      {inst === "guitar"
                        ? "Guitarra"
                        : inst === "bass"
                          ? "Bajo"
                          : inst === "ukulele"
                            ? "Ukelele"
                            : "Piano"}
                    </button>
                  )
                )}
              </div>
            </div>
          </Card>
        </aside>

        {/* Resultados */}
        <div>
          {/* Filtros activos */}
          {hasFilters && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-sm text-muted-foreground">
                Filtros activos:
              </span>
              {selectedDifficulty && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setSelectedDifficulty(null)}>
                  {selectedDifficulty === "easy"
                    ? "Fácil"
                    : selectedDifficulty === "intermediate"
                      ? "Intermedio"
                      : "Difícil"}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              )}
              {selectedInstrument && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setSelectedInstrument(null)}>
                  {selectedInstrument === "guitar"
                    ? "Guitarra"
                    : selectedInstrument === "bass"
                      ? "Bajo"
                      : selectedInstrument === "ukulele"
                        ? "Ukelele"
                        : "Piano"}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              )}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-48 w-full" />
                </div>
              ))}
            </div>
          )}

          {/* Resultados */}
          {!loading && results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((cifra) => (
                <CifraCard key={cifra.id} cifra={cifra} />
              ))}
            </div>
          )}

          {/* Sin resultados */}
          {!loading && query && results.length === 0 && (
            <Card className="p-12 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="text-6xl">🔍</div>
                <h2 className="text-2xl font-bold">
                  No se encontraron resultados
                </h2>
                <p className="text-muted-foreground">
                  No encontramos cifras que coincidan con tu búsqueda. Intenta
                  con otros términos o elimina algunos filtros.
                </p>
                {hasFilters && (
                  <Button onClick={clearFilters}>Limpiar filtros</Button>
                )}
              </div>
            </Card>
          )}

          {/* Sin query */}
          {!loading && !query && (
            <Card className="p-12 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="text-6xl">🎸</div>
                <h2 className="text-2xl font-bold">
                  Busca tu canción favorita
                </h2>
                <p className="text-muted-foreground">
                  Usa la barra de búsqueda para encontrar cifras de tus artistas
                  favoritos
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-8">
          <Skeleton className="h-12 w-full max-w-2xl mx-auto mb-8" />
        </div>
      }>
      <SearchPageContent />
    </Suspense>
  );
}
