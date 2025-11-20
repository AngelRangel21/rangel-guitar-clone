// ============================================
// app/favoritos/page.tsx - Página de favoritos
// ============================================
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";
import { FavoriteService } from "@/lib/services/favorite.service";
import { CifraCard } from "@/components/home/cifra-card";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import type { CifraPreview } from "@/types";
import Link from "next/link";

export default function FavoritosPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  const [cifras, setCifras] = useState<CifraPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    if (isAuthenticated) {
      FavoriteService.getUserFavorites()
        .then(setCifras)
        .finally(() => setIsLoading(false));
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || isLoading) {
    return (
      <div className="container py-8">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="h-8 w-8 ext-primary fill-current" />
          <h1 className="text-4xl font-bold">Mis Favoritos</h1>
        </div>
        <p className="text-muted-foreground">
          {cifras.length}{" "}
          {cifras.length === 1 ? "cifra guardada" : "cifras guardadas"}
        </p>
      </div>

      {/* Cifras */}
      {cifras.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cifras.map((cifra) => (
            <CifraCard key={cifra.id} cifra={cifra} />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground" />
            <h2 className="text-2xl font-bold">Aún no tienes favoritos</h2>
            <p className="text-muted-foreground">
              Explora cifras y guarda tus favoritas para acceder a ellas
              rápidamente
            </p>
            <Button>
              <Link href="/">Explorar cifras</Link>
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
