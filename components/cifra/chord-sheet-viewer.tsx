// ============================================
// components/cifra/chord-sheet-viewer.tsx - ACTUALIZADO con transposición
// ============================================
"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useCifraStore } from "@/lib/stores/cifra-store";
import { transposeCifra, shouldUseFlats } from "@/lib/utils/chord-transpose";

interface ChordSheetViewerProps {
  content: string;
  originalKey: string;
}

export function ChordSheetViewer({
  content,
  originalKey,
}: ChordSheetViewerProps) {
  const { transpose, fontSize, reset } = useCifraStore();

  // Reset al desmontar
  useEffect(() => {
    return () => reset();
  }, [reset]);

  // Determinar si usar bemoles basado en la tonalidad original
  const preferFlats = shouldUseFlats(originalKey);

  // Transponer contenido
  const transposedContent = transposeCifra(content, transpose, preferFlats);

  const lines = transposedContent.split("\n");

  const renderLine = (line: string, index: number) => {
    // Si es una sección (ej: [Intro], [Verso 1], [Coro])
    if (line.match(/^\[([^\]]+)\]$/)) {
      return (
        <div key={index} className="font-bold text-primary mt-6 mb-3 text-lg">
          {line.replace(/[\[\]]/g, "")}
        </div>
      );
    }

    // Si es una línea vacía
    if (line.trim() === "") {
      return <div key={index} className="h-4" />;
    }

    // Detectar acordes en la línea [C] [G] etc
    const chordRegex = /\[([A-G][#b]?(?:m|maj|dim|aug|sus|add)?[0-9]*)\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = chordRegex.exec(line)) !== null) {
      // Texto antes del acorde
      if (match.index > lastIndex) {
        parts.push({
          type: "text",
          content: line.substring(lastIndex, match.index),
        });
      }
      // El acorde
      parts.push({
        type: "chord",
        content: match[1],
      });
      lastIndex = match.index + match[0].length;
    }

    // Texto restante
    if (lastIndex < line.length) {
      parts.push({
        type: "text",
        content: line.substring(lastIndex),
      });
    }

    return (
      <div key={index} className="leading-relaxed min-h-[1.5em]">
        {parts.map((part, i) =>
          part.type === "chord" ? (
            <span
              key={i}
              className="inline-block text-primary font-bold px-1 relative"
              style={{ minWidth: "2ch" }}
            >
              {part.content}
            </span>
          ) : (
            <span key={i}>{part.content}</span>
          )
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardContent className="p-8">
        <div
          className="chord-sheet font-mono"
          style={{ fontSize: `${fontSize}px` }}
        >
          {lines.map((line, index) => renderLine(line, index))}
        </div>
      </CardContent>
    </Card>
  );
}
