// ============================================
// types/cifra.ts
// ============================================

import type { Artist } from './artist'

export type Difficulty = 'easy' | 'intermediate' | 'hard'
export type Instrument = 'guitar' | 'bass' | 'ukulele' | 'piano' | 'drums'
export type CifraStatus = 'draft' | 'pending' | 'published' | 'rejected'

export interface Cifra {
  id: string
  artist_id: string
  title: string
  slug: string
  content: string
  original_key: string
  difficulty: Difficulty | null
  instrument: Instrument
  views_count: number
  favorites_count: number
  rating: number
  ratings_count: number
  has_video: boolean
  video_url: string | null
  video_start_time: number
  created_by: string | null
  status: CifraStatus
  moderated_by: string | null
  moderated_at: string | null
  created_at: string
  updated_at: string
}

export interface CifraWithArtist extends Cifra {
  artist: Artist
}

export interface CifraPreview {
  id: string
  title: string
  slug: string
  original_key: string
  difficulty: Difficulty | null
  views_count: number
  favorites_count: number
  rating: number
  artist: {
    name: string
    slug: string
  }
}

export interface CifraWithRelations extends Cifra {
  artist: Artist
  is_favorite?: boolean
  user_rating?: number | null
}
