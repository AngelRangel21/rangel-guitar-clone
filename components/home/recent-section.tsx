// ============================================
// components/home/recent-section.tsx
// ============================================
"use client";

import { useEffect, useState } from "react";
import { CifraService } from "@/lib/services/cifra.service";
import { CifraCard } from "./cifra-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { CifraPreview } from "@/types";
import { Clock } from "lucide-react";

export function RecentSection() {
  const [cifras, setCifras] = useState<CifraPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CifraService.getRecent(8)
      .then(setCifras)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-12">
        <div className="container">
          <div className="flex items-center gap-2 mb-8">
            <Clock className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Agregadas Recientemente</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-(--color-muted)/30">
      <div className="container">
        <div className="flex items-center gap-2 mb-8">
          <Clock className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Agregadas Recientemente</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cifras.map((cifra) => (
            <CifraCard key={cifra.id} cifra={cifra} />
          ))}
        </div>
      </div>
    </section>
  );
}
