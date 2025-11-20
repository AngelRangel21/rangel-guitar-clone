// ============================================
// types/form.ts
// ============================================

import type { Difficulty, Instrument, SkillLevel } from './index'

export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  email: string
  password: string
  username: string
  full_name?: string
}

export interface CifraFormData {
  artist_id: string
  title: string
  content: string
  original_key: string
  difficulty?: Difficulty
  instrument?: Instrument
  video_url?: string
  video_start_time?: number
}

export interface ProfileFormData {
  username: string
  full_name?: string
  bio?: string
  instrument?: string
  skill_level?: SkillLevel
}

export interface PlaylistFormData {
  name: string
  description?: string
  is_public: boolean
}
