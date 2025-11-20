// ============================================
// types/database.ts - Tipos base de la base de datos
// ============================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          instrument: string | null
          skill_level: 'beginner' | 'intermediate' | 'advanced' | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          instrument?: string | null
          skill_level?: 'beginner' | 'intermediate' | 'advanced' | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          instrument?: string | null
          skill_level?: 'beginner' | 'intermediate' | 'advanced' | null
          created_at?: string
          updated_at?: string
        }
      }
      artists: {
        Row: {
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
        Insert: {
          id?: string
          name: string
          slug: string
          bio?: string | null
          image_url?: string | null
          country?: string | null
          genres?: string[]
          verified?: boolean
          cifras_count?: number
          views_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          bio?: string | null
          image_url?: string | null
          country?: string | null
          genres?: string[]
          verified?: boolean
          cifras_count?: number
          views_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      cifras: {
        Row: {
          id: string
          artist_id: string
          title: string
          slug: string
          content: string
          original_key: string
          difficulty: 'easy' | 'intermediate' | 'hard' | null
          instrument: 'guitar' | 'bass' | 'ukulele' | 'piano' | 'drums'
          views_count: number
          favorites_count: number
          rating: number
          ratings_count: number
          has_video: boolean
          video_url: string | null
          video_start_time: number
          created_by: string | null
          status: 'draft' | 'pending' | 'published' | 'rejected'
          moderated_by: string | null
          moderated_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          artist_id: string
          title: string
          slug: string
          content: string
          original_key: string
          difficulty?: 'easy' | 'intermediate' | 'hard' | null
          instrument?: 'guitar' | 'bass' | 'ukulele' | 'piano' | 'drums'
          views_count?: number
          favorites_count?: number
          rating?: number
          ratings_count?: number
          has_video?: boolean
          video_url?: string | null
          video_start_time?: number
          created_by?: string | null
          status?: 'draft' | 'pending' | 'published' | 'rejected'
          moderated_by?: string | null
          moderated_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          artist_id?: string
          title?: string
          slug?: string
          content?: string
          original_key?: string
          difficulty?: 'easy' | 'intermediate' | 'hard' | null
          instrument?: 'guitar' | 'bass' | 'ukulele' | 'piano' | 'drums'
          views_count?: number
          favorites_count?: number
          rating?: number
          ratings_count?: number
          has_video?: boolean
          video_url?: string | null
          video_start_time?: number
          created_by?: string | null
          status?: 'draft' | 'pending' | 'published' | 'rejected'
          moderated_by?: string | null
          moderated_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      favorites: {
        Row: {
          user_id: string
          cifra_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          cifra_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          cifra_id?: string
          created_at?: string
        }
      }
      ratings: {
        Row: {
          user_id: string
          cifra_id: string
          rating: number
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          cifra_id: string
          rating: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          cifra_id?: string
          rating?: number
          created_at?: string
          updated_at?: string
        }
      }
      playlists: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          is_public: boolean
          cifras_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          is_public?: boolean
          cifras_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          is_public?: boolean
          cifras_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      playlist_items: {
        Row: {
          id: string
          playlist_id: string
          cifra_id: string
          position: number
          created_at: string
        }
        Insert: {
          id?: string
          playlist_id: string
          cifra_id: string
          position: number
          created_at?: string
        }
        Update: {
          id?: string
          playlist_id?: string
          cifra_id?: string
          position?: number
          created_at?: string
        }
      }
      search_history: {
        Row: {
          id: string
          user_id: string
          query: string
          results_count: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          query: string
          results_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          query?: string
          results_count?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      search_cifras: {
        Args: {
          search_query: string
          limit_count?: number
          offset_count?: number
        }
        Returns: {
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
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// ============================================
// types/user.ts - Tipos de usuario
// ============================================

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

export interface Profile {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  instrument: string | null
  skill_level: SkillLevel | null
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  profile: Profile
}

// ============================================
// types/artist.ts - Tipos de artista
// ============================================

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

// ============================================
// types/cifra.ts - Tipos de cifra
// ============================================

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

// ============================================
// types/chord.ts - Tipos de acordes
// ============================================

export interface Chord {
  name: string
  base: string // C, D, E, F, G, A, B
  suffix: string // m, 7, maj7, etc
  positions: ChordPosition[]
}

export interface ChordPosition {
  frets: number[] // Array de 6 números para las 6 cuerdas
  fingers: number[] // Array de 6 números indicando qué dedo usar
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

// ============================================
// types/playlist.ts - Tipos de playlist
// ============================================

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

// ============================================
// types/search.ts - Tipos de búsqueda
// ============================================

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

// ============================================
// types/api.ts - Tipos de respuestas API
// ============================================

export interface ApiResponse<T> {
  data: T | null
  error: ApiError | null
  status: number
}

export interface ApiError {
  message: string
  code?: string
  details?: unknown
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

// ============================================
// types/player.ts - Tipos del reproductor
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

// ============================================
// types/transpose.ts - Tipos de transposición
// ============================================

export type ChromaticNote = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B'

export interface TransposeOptions {
  steps: number
  preferSharps?: boolean
}

export interface ChordTransposition {
  original: string
  transposed: string
}

// ============================================
// types/form.ts - Tipos de formularios
// ============================================

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

// ============================================
// types/ui.ts - Tipos de UI
// ============================================

export interface TabItem {
  id: string
  label: string
  content: React.ReactNode
}

export interface DropdownItem {
  id: string
  label: string
  icon?: React.ReactNode
  onClick: () => void
  disabled?: boolean
}

export interface ToastOptions {
  title: string
  description?: string
  variant?: 'default' | 'destructive' | 'success'
  duration?: number
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
}

// ============================================
// types/constants.ts - Constantes tipadas
// ============================================

export const INSTRUMENTS = ['guitar', 'bass', 'ukulele', 'piano', 'drums'] as const
export const DIFFICULTIES = ['easy', 'intermediate', 'hard'] as const
export const SKILL_LEVELS = ['beginner', 'intermediate', 'advanced'] as const
export const MUSICAL_KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const
export const CIFRA_STATUS = ['draft', 'pending', 'published', 'rejected'] as const