// ============================================
// lib/utils/chord-transpose.ts - Lógica de transposición
// ============================================

// Notas cromáticas (12 semitonos)
const CHROMATIC_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const CHROMATIC_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

// Mapeo de bemoles a sostenidos
const FLAT_TO_SHARP: Record<string, string> = {
  'Db': 'C#',
  'Eb': 'D#',
  'Gb': 'F#',
  'Ab': 'G#',
  'Bb': 'A#',
}

// Mapeo de sostenidos a bemoles
const SHARP_TO_FLAT: Record<string, string> = {
  'C#': 'Db',
  'D#': 'Eb',
  'F#': 'Gb',
  'G#': 'Ab',
  'A#': 'Bb',
}

/**
 * Normaliza un acorde a formato sharp
 */
function normalizeChord(chord: string): string {
  // Extraer la nota base (puede tener modificadores como m, 7, maj7, etc)
  const match = chord.match(/^([A-G][#b]?)(.*)$/)
  if (!match) return chord

  const [, note, suffix] = match
  
  // Convertir bemol a sostenido si es necesario
  const normalizedNote = FLAT_TO_SHARP[note] || note
  
  return normalizedNote + suffix
}

/**
 * Transpone una nota individual
 */
function transposeNote(note: string, steps: number, preferFlats: boolean = false): string {
  const scale = preferFlats ? CHROMATIC_FLAT : CHROMATIC_SHARP
  
  // Normalizar la nota primero
  const normalizedNote = FLAT_TO_SHARP[note] || note
  
  // Encontrar índice en la escala
  const index = CHROMATIC_SHARP.indexOf(normalizedNote)
  if (index === -1) return note // No es una nota válida
  
  // Calcular nuevo índice (módulo 12 para mantener en el rango)
  const newIndex = (index + steps + 12) % 12
  
  return scale[newIndex]
}

/**
 * Transpone un acorde completo (con sufijos como m, 7, maj7, etc)
 */
export function transposeChord(chord: string, steps: number, preferFlats: boolean = false): string {
  if (!chord || chord.trim() === '') return chord
  
  // Extraer la nota base y el sufijo
  const match = chord.match(/^([A-G][#b]?)(.*)$/)
  if (!match) return chord
  
  const [, note, suffix] = match
  
  // Transponer solo la nota base
  const transposedNote = transposeNote(note, steps, preferFlats)
  
  return transposedNote + suffix
}

/**
 * Detecta si una línea contiene acordes
 */
export function hasChords(line: string): boolean {
  // Buscar patrones como [C], [Am], [G7], etc.
  return /\[[A-G][#b]?[^\]]*\]/.test(line)
}

/**
 * Transpone todas las líneas de una cifra
 */
export function transposeCifra(content: string, steps: number, preferFlats: boolean = false): string {
  if (steps === 0) return content
  
  const lines = content.split('\n')
  
  return lines.map(line => {
    // Si la línea no tiene acordes, devolverla sin cambios
    if (!hasChords(line)) return line
    
    // Transponer todos los acordes en la línea
    return line.replace(/\[([A-G][#b]?[^\]]*)\]/g, (match, chord) => {
      const transposed = transposeChord(chord, steps, preferFlats)
      return `[${transposed}]`
    })
  }).join('\n')
}

/**
 * Obtiene la tonalidad transpuesta
 */
export function transposeKey(key: string, steps: number, preferFlats: boolean = false): string {
  return transposeChord(key, steps, preferFlats)
}

/**
 * Detecta si debería usar bemoles basado en la tonalidad original
 */
export function shouldUseFlats(originalKey: string): boolean {
  const flatsKeys = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb']
  return flatsKeys.includes(originalKey)
}