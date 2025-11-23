// components/search/search-bar.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search, X, Loader2 } from "lucide-react";
import { SearchService } from "@/lib/services/search.service";
import { SearchResults } from "./search-results";
import type { CifraPreview } from "@/types";
import { useDebounce } from "@/lib/hooks/use-debounce";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  showResults?: boolean;
}

export function SearchBar({
  className,
  placeholder = "Buscar cifras, artistas...",
  showResults = true,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CifraPreview[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce para no hacer búsquedas en cada tecla
  const debouncedQuery = useDebounce(query, 500);

  // Función de búsqueda separada
  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);

    try {
      const data = await SearchService.simpleSearch(searchQuery, 10);
      setResults(data);
      setIsOpen(true);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Buscar cuando cambie el query debounced
  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  const handleSelectResult = () => {
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (results.length > 0) setIsOpen(true);
            }}
            className="pl-10 pr-10"
          />
          {isLoading ? (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-(--color-foreground)">
                <X className="h-4 w-4" />
              </button>
            )
          )}
        </div>
      </form>

      {/* Resultados */}
      {showResults && isOpen && results.length > 0 && (
        <SearchResults
          results={results}
          query={query}
          onSelect={handleSelectResult}
        />
      )}
    </div>
  );
}
