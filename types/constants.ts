// ============================================
// types/constants.ts
// ============================================

export const INSTRUMENTS = [
  'guitar',
  'bass', 
  'ukulele',
  'piano',
  'drums'
] as const

export const DIFFICULTIES = [
  'easy',
  'intermediate',
  'hard'
] as const

export const SKILL_LEVELS = [
  'beginner',
  'intermediate',
  'advanced'
] as const

export const MUSICAL_KEYS = [
  'C', 'C#', 'Db',
  'D', 'D#', 'Eb',
  'E',
  'F', 'F#', 'Gb',
  'G', 'G#', 'Ab',
  'A', 'A#', 'Bb',
  'B'
] as const

export const CIFRA_STATUS = [
  'draft',
  'pending',
  'published',
  'rejected'
] as const

export const CHORD_SUFFIXES = [
  '', 'm', '7', 'maj7', 'm7', 'sus4', 'sus2',
  '6', 'm6', '9', 'add9', 'dim', 'aug'
] as const