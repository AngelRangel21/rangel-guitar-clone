// ============================================
// types/player.ts
// ============================================

export interface PlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  playbackRate: number
}

export interface MetronomeState {
  isPlaying: boolean
  tempo: number
  beatsPerMeasure: number
  currentBeat: number
}

export interface TunerState {
  isActive: boolean
  detectedNote: string | null
  frequency: number
  cents: number
  isInTune: boolean
}