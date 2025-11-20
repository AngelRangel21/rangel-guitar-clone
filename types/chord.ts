// ============================================
// types/chord.ts
// ============================================

export interface Chord {
  name: string
  base: string
  suffix: string
  positions: ChordPosition[]
}

export interface ChordPosition {
  frets: number[]
  fingers: number[]
  baseFret: number
  barres: number[]
  midi: number[]
}

export interface ChordLine {
  chords: string[]
  lyrics: string
}

export interface ParsedCifra {
  title: string
  artist: string
  key: string
  lines: ChordLine[]
}