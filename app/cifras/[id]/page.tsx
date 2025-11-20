// ============================================
// app/cifras/[id]/page.tsx - ACTUALIZADO para pasar originalKey
// ============================================
import { notFound } from "next/navigation";
import { CifraService } from "@/lib/services/cifra.service";
import { CifraHeader } from "@/components/cifra/cifra-header";
import { CifraControls } from "@/components/cifra/cifra-controls";
import { ChordSheetViewer } from "@/components/cifra/chord-sheet-viewer";
import { CifraSidebar } from "@/components/cifra/cifra-sidebar";
import type { Metadata } from "next";

interface CifraPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: CifraPageProps): Promise<Metadata> {
  const { id } = await params;
  const cifra = await CifraService.getByIdServer(id);

  if (!cifra) {
    return {
      title: "Cifra no encontrada",
    };
  }

  return {
    title: `${cifra.title} - ${cifra.artist.name} | CifraClub`,
    description: `Aprende a tocar ${cifra.title} de ${cifra.artist.name}. Cifra con acordes y letra completa.`,
  };
}

export default async function CifraPage({ params }: CifraPageProps) {
  const { id } = await params;
  const cifra = await CifraService.getByIdServer(id);

  if (!cifra) {
    notFound();
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        {/* Contenido Principal */}
        <div className="space-y-6">
          <CifraHeader cifra={cifra} />
          <CifraControls originalKey={cifra.original_key} />
          <ChordSheetViewer
            content={cifra.content}
            originalKey={cifra.original_key}
          />
        </div>

        {/* Sidebar */}
        <CifraSidebar cifra={cifra} />
      </div>
    </div>
  );
}
