// ============================================
// types/search.ts
// ============================================

import type { Difficulty, Instrument } from './cifra'

export interface SearchResult {
  id: string
  title: string
  artist_name: string
  artist_slug: string
  slug: string
  original_key: string
  difficulty: string
  views_count: number
  favorites_count: number
  rating: number
  rank: number
}

export interface SearchFilters {
  difficulty?: Difficulty
  instrument?: Instrument
  key?: string
  minRating?: number
  sortBy?: 'relevance' | 'views' | 'rating' | 'recent'
}

export interface SearchHistory {
  id: string
  user_id: string
  query: string
  results_count: number
  created_at: string
}