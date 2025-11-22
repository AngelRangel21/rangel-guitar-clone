// ============================================
// app/admin/cifras/[id]/page.tsx - Editor de cifra
// ============================================
"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import type { Cifra, Artist } from "@/types";

interface CifraEditorProps {
  params: Promise<{ slug: string }>;
}

export default function CifraEditorPage({ params }: CifraEditorProps) {
  const { slug } = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [formData, setFormData] = useState<Partial<Cifra>>({
    title: "",
    artist_id: "",
    content: "",
    original_key: "C",
    difficulty: "easy",
    instrument: "guitar",
    status: "published",
    video_url: "",
  });

  useEffect(() => {
    loadData();
  }, [slug]);

  const loadData = async () => {
    const supabase = createClient();
    setIsLoading(true);

    // Cargar cifra
    const { data: cifra, error: cifraError } = await supabase
      .from("cifras")
      .select("*")
      .eq("slug", slug)
      .single();

    if (cifraError) {
      toast.error("Error al cargar cifra");
      console.error(cifraError);
      return;
    }

    setFormData(cifra);

    // Cargar artistas
    const { data: artistsData, error: artistsError } = await supabase
      .from("artists")
      .select("*")
      .order("name");

    if (artistsError) {
      console.error(artistsError);
    } else {
      setArtists(artistsData || []);
    }

    setIsLoading(false);
  };

  const handleSave = async () => {
    console.log("🚀 Iniciando guardado...");
    console.log("📝 Datos a guardar:", formData);

    if (!formData.title || !formData.artist_id || !formData.content) {
      toast.error("Por favor completa los campos requeridos");
      return;
    }

    setIsSaving(true);
    const supabase = createClient();

    const updateData = {
      title: formData.title,
      artist_id: formData.artist_id,
      content: formData.content,
      original_key: formData.original_key,
      difficulty: formData.difficulty,
      instrument: formData.instrument,
      status: formData.status,
      video_url: formData.video_url || null,
    };

    console.log("📦 Datos a enviar:", updateData);

    const { data, error } = await supabase
      .from("cifras")
      .update(updateData)
      .eq("slug", slug)
      .select();

    console.log("📊 Respuesta de Supabase:", { data, error });

    setIsSaving(false);

    if (error) {
      console.error("❌ Error completo:", error);
      toast.error("Error al guardar: " + error.message);
    } else {
      console.log("✅ Guardado exitoso!");
      toast.success("Cifra actualizada exitosamente");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const ALL_CHORDS = [
    "C",
    "Cm",
    "C#",
    "C#m",
    "D",
    "Dm",
    "D#",
    "D#m",
    "E",
    "Em",
    "F",
    "Fm",
    "F#",
    "F#m",
    "G",
    "Gm",
    "G#",
    "G#m",
    "A",
    "Am",
    "A#",
    "A#m",
    "B",
    "Bm",
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/cifras">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Editar Cifra</h1>
            <p className="text-[var(--color-muted-foreground)] mt-1">
              Slug: {slug}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/cifras/${slug}`} target="_blank">
              <Eye className="h-4 w-4 mr-2" />
              Vista Previa
            </Link>
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Guardar Cambios
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
        {/* Editor Principal */}
        <div className="space-y-6">
          {/* Información básica */}
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Nombre de la canción"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="artist">Artista *</Label>
                <Select
                  value={formData.artist_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, artist_id: value })
                  }>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un artista" />
                  </SelectTrigger>
                  <SelectContent>
                    {artists.map((artist) => (
                      <SelectItem key={artist.id} value={artist.id}>
                        {artist.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="key">Tonalidad</Label>
                  <Select
                    value={formData.original_key}
                    onValueChange={(value) =>
                      setFormData({ ...formData, original_key: value })
                    }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ALL_CHORDS.map((key) => (
                        <SelectItem key={key} value={key}>
                          {key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Dificultad</Label>
                  <Select
                    value={formData.difficulty || "easy"}
                    onValueChange={(value: any) =>
                      setFormData({ ...formData, difficulty: value })
                    }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Fácil</SelectItem>
                      <SelectItem value="intermediate">Intermedio</SelectItem>
                      <SelectItem value="hard">Difícil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="video">Video URL (opcional)</Label>
                <Input
                  id="video"
                  value={formData.video_url || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, video_url: e.target.value })
                  }
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Editor de contenido */}
          <Card>
            <CardHeader>
              <CardTitle>Contenido de la Cifra</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="content">
                  Letra con Acordes *
                  <span className="text-sm text-[var(--color-muted-foreground)] ml-2">
                    (Usa [C], [Am], etc. para los acordes)
                  </span>
                </Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="[Intro]&#10;[C] [G] [Am] [F]&#10;&#10;[Verso 1]&#10;[C]Letra de la can[G]ción&#10;Con [Am]acordes entre cor[F]chetes"
                  className="font-mono text-sm min-h-[500px]"
                />
                <p className="text-xs text-[var(--color-muted-foreground)]">
                  Formato: Usa corchetes [] para los acordes. Ejemplo: [C]Hola
                  [G]mundo
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Estado */}
          <Card>
            <CardHeader>
              <CardTitle>Estado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Estado de publicación</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, status: value })
                  }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Borrador</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                    <SelectItem value="rejected">Rechazado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instrument">Instrumento</Label>
                <Select
                  value={formData.instrument}
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, instrument: value })
                  }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guitar">Guitarra</SelectItem>
                    <SelectItem value="bass">Bajo</SelectItem>
                    <SelectItem value="ukulele">Ukelele</SelectItem>
                    <SelectItem value="piano">Piano</SelectItem>
                    <SelectItem value="drums">Batería</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Guía rápida */}
          <Card>
            <CardHeader>
              <CardTitle>Guía Rápida</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Acordes:</strong>
                  <code className="block bg-[var(--color-muted)] p-2 rounded mt-1">
                    [C] [Am] [G7] [Fmaj7]
                  </code>
                </div>
                <div>
                  <strong>Secciones:</strong>
                  <code className="block bg-[var(--color-muted)] p-2 rounded mt-1">
                    [Intro]&#10;[Verso 1]&#10;[Coro]&#10;[Puente]
                  </code>
                </div>
                <div>
                  <strong>Letra con acordes:</strong>
                  <code className="block bg-[var(--color-muted)] p-2 rounded mt-1">
                    [C]Esta es la [G]letra&#10;con [Am]acordes [F]incluidos
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
