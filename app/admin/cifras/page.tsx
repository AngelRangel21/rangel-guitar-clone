// ============================================
// app/admin/cifras/page.tsx - Gestión de cifras
// ============================================
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import type { CifraWithArtist } from "@/types";

export default function AdminCifrasPage() {
  const [cifras, setCifras] = useState<CifraWithArtist[]>([]);
  const [filteredCifras, setFilteredCifras] = useState<CifraWithArtist[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCifras();
  }, []);

  const loadCifras = async () => {
    const supabase = createClient();
    setIsLoading(true);

    const { data, error } = await supabase
      .from("cifras")
      .select(
        `
        *,
        artist:artists(*)
      `
      )
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error al cargar cifras");
      console.error(error);
    } else {
      setCifras(data as CifraWithArtist[]);
      setFilteredCifras(data as CifraWithArtist[]);
    }

    setIsLoading(false);
  };

  // Filtrar cifras
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCifras(cifras);
    } else {
      const filtered = cifras.filter(
        (cifra) =>
          cifra.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cifra.artist.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCifras(filtered);
    }
  }, [searchQuery, cifras]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Estás seguro de eliminar "${title}"?`)) return;

    const supabase = createClient();
    const { error } = await supabase.from("cifras").delete().eq("id", id);

    if (error) {
      toast.error("Error al eliminar cifra");
      console.error(error);
    } else {
      toast.success("Cifra eliminada");
      loadCifras();
    }
  };

  const statusColors = {
    draft: "bg-gray-500/10 text-gray-500",
    pending: "bg-yellow-500/10 text-yellow-500",
    published: "bg-green-500/10 text-green-500",
    rejected: "bg-red-500/10 text-red-500",
  };

  const statusLabels = {
    draft: "Borrador",
    pending: "Pendiente",
    published: "Publicado",
    rejected: "Rechazado",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Cifras</h1>
          <p className="text-[var(--color-muted-foreground)] mt-2">
            Administra todas las cifras del sitio
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/cifras/nueva">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Cifra
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted-foreground)]" />
          <Input
            placeholder="Buscar por título o artista..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-sm text-[var(--color-muted-foreground)]">
        <span>Total: {filteredCifras.length}</span>
        <span>•</span>
        <span>
          Publicadas:{" "}
          {filteredCifras.filter((c) => c.status === "published").length}
        </span>
        <span>•</span>
        <span>
          Pendientes:{" "}
          {filteredCifras.filter((c) => c.status === "pending").length}
        </span>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Artista</TableHead>
              <TableHead>Tonalidad</TableHead>
              <TableHead>Dificultad</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Vistas</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : filteredCifras.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No se encontraron cifras
                </TableCell>
              </TableRow>
            ) : (
              filteredCifras.map((cifra) => (
                <TableRow key={cifra.id}>
                  <TableCell className="font-medium">{cifra.title}</TableCell>
                  <TableCell>{cifra.artist.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{cifra.original_key}</Badge>
                  </TableCell>
                  <TableCell>
                    {cifra.difficulty ? (
                      <Badge variant="outline">
                        {cifra.difficulty === "easy"
                          ? "Fácil"
                          : cifra.difficulty === "intermediate"
                            ? "Intermedio"
                            : "Difícil"}
                      </Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[cifra.status]}>
                      {statusLabels[cifra.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>{cifra.views_count.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/cifras/${cifra.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/cifras/${cifra.slug}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(cifra.id, cifra.title)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
