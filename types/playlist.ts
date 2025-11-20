// ============================================
// types/playlist.ts
// ============================================

import type { CifraPreview } from './cifra'

export interface Playlist {
  id: string
  user_id: string
  name: string
  description: string | null
  is_public: boolean
  cifras_count: number
  created_at: string
  updated_at: string
}

export interface PlaylistWithItems extends Playlist {
  items: PlaylistItem[]
}

export interface PlaylistItem {
  id: string
  playlist_id: string
  cifra_id: string
  position: number
  created_at: string
  cifra: CifraPreview
}