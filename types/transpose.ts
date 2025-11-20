// ============================================
// types/transpose.ts
// ============================================

export type ChromaticNote = 
  | 'C' | 'C#' | 'Db'
  | 'D' | 'D#' | 'Eb'
  | 'E'
  | 'F' | 'F#' | 'Gb'
  | 'G' | 'G#' | 'Ab'
  | 'A' | 'A#' | 'Bb'
  | 'B'

export interface TransposeOptions {
  steps: number
  preferSharps?: boolean
}

export interface ChordTransposition {
  original: string
  transposed: string
}