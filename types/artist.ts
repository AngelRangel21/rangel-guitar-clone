// ============================================
// types/artist.ts
// ============================================

import type { CifraPreview } from './cifra'

export interface Artist {
  id: string
  name: string
  slug: string
  bio: string | null
  image_url: string | null
  country: string | null
  genres: string[]
  verified: boolean
  cifras_count: number
  views_count: number
  created_at: string
  updated_at: string
}

export interface ArtistWithCifras extends Artist {
  cifras: CifraPreview[]
}