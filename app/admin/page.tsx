// ============================================
// app/admin/page.tsx - Dashboard principal
// ============================================
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music2, Users, Eye, Heart } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Stats {
  totalCifras: number;
  totalArtists: number;
  totalViews: number;
  totalFavorites: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalCifras: 0,
    totalArtists: 0,
    totalViews: 0,
    totalFavorites: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const supabase = createClient();

      // Cifras totales
      const { count: cifrasCount } = await supabase
        .from("cifras")
        .select("*", { count: "exact", head: true });

      // Artistas totales
      const { count: artistsCount } = await supabase
        .from("artists")
        .select("*", { count: "exact", head: true });

      // Total de vistas
      const { data: viewsData } = await supabase
        .from("cifras")
        .select("views_count");

      const totalViews =
        viewsData?.reduce((sum, item) => sum + item.views_count, 0) || 0;

      // Total de favoritos
      const { count: favoritesCount } = await supabase
        .from("favorites")
        .select("*", { count: "exact", head: true });

      setStats({
        totalCifras: cifrasCount || 0,
        totalArtists: artistsCount || 0,
        totalViews,
        totalFavorites: favoritesCount || 0,
      });
    };

    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-[var(--color-muted-foreground)] mt-2">
          Bienvenido al panel de administración
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Cifras</CardTitle>
            <Music2 className="h-4 w-4 text-[var(--color-muted-foreground)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCifras}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Artistas
            </CardTitle>
            <Users className="h-4 w-4 text-[var(--color-muted-foreground)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalArtists}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Vistas</CardTitle>
            <Eye className="h-4 w-4 text-[var(--color-muted-foreground)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalViews.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Favoritos
            </CardTitle>
            <Heart className="h-4 w-4 text-[var(--color-muted-foreground)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFavorites}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
