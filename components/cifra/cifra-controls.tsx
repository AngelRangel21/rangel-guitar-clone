// ============================================
// components/cifra/cifra-controls.tsx - ACTUALIZADO
// ============================================
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  // Play,
  // Pause,
  RotateCcw,
  Settings,
} from "lucide-react";
import { useCifraStore } from "@/lib/stores/cifra-store";
import { transposeKey } from "@/lib/utils/chord-transpose";

interface CifraControlsProps {
  originalKey: string;
}

export function CifraControls({ originalKey }: CifraControlsProps) {
  const {
    transpose,
    fontSize,
    // isAutoScrolling,
    setTranspose,
    resetTranspose,
    setFontSize,
    // setAutoScrolling,
  } = useCifraStore();

  const currentKey = transposeKey(originalKey, transpose);

  return (
    <Card className="p-4">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Transposición */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Tonalidad:</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTranspose(transpose - 1)}
            title="Bajar un semitono"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
          <div className="flex flex-col items-center min-w-[60px]">
            <Badge
              variant="outline"
              className="font-mono font-bold text-base px-3"
            >
              {currentKey}
            </Badge>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTranspose(transpose + 1)}
            title="Subir un semitono"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          {transpose ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={resetTranspose}
              title="Reset"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="ghost" disabled size="icon">
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Separator orientation="vertical" className="h-8" />

        {/* Tamaño de Fuente */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Tamaño:</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setFontSize(Math.max(12, fontSize - 2))}
            disabled={fontSize <= 12}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="w-16 text-center font-mono text-sm">{fontSize}px</div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setFontSize(Math.min(24, fontSize + 2))}
            disabled={fontSize >= 24}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8" />

        {/* Auto-scroll */}
        {/* <Button
          variant={isAutoScrolling ? "default" : "outline"}
          onClick={() => setAutoScrolling(!isAutoScrolling)}
        >
          {isAutoScrolling ? (
            <>
              <Pause className="h-4 w-4 mr-2" />
              Pausar
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Auto-scroll
            </>
          )}
        </Button> */}

        <Separator orientation="vertical" className="h-8" />

        {/* Más opciones */}
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Opciones
        </Button>
      </div>

      {/* Info de transposición */}
      {/* {transpose !== 0 && (
        <div className="mt-3 pt-3 border-t">
          <p className="text-sm text-muted-foreground">
            Original:{" "}
            <span className="font-semibold text-[var(--color-foreground)]">
              {originalKey}
            </span>
            {" → "}
            Transpuesto:{" "}
            <span className="font-semibold text-[var(--color-foreground)]">
              {currentKey}
            </span>{" "}
            ({Math.abs(transpose)}{" "}
            {Math.abs(transpose) === 1 ? "semitono" : "semitonos"}{" "}
            {transpose > 0 ? "arriba" : "abajo"})
          </p>
        </div>
      )} */}
      {transpose ? (
        <div className="mt-3 pt-3 border-t">
          <p className="text-sm text-muted-foreground">
            Original:{" "}
            <span className="font-semibold text-(--color-foreground)">
              {originalKey}
            </span>
            {" → "}
            Transpuesto:{" "}
            <span className="font-semibold text-(--color-foreground)">
              {currentKey}
            </span>{" "}
            ({Math.abs(transpose)}{" "}
            {Math.abs(transpose) === 1 ? "semitono" : "semitonos"}{" "}
            {transpose > 0 ? "arriba" : "abajo"})
          </p>
        </div>
      ) : (
        <div className="mt-3 pt-3 border-t">
          <p className="text-sm text-muted-foreground">
            Original:{" "}
            <span className="font-semibold text-(--color-foreground)">
              {originalKey}
            </span>
          </p>
        </div>
      )}
    </Card>
  );
}
