// types/index.ts
// Archivo central para exportar todos los tipos

// Database types
export type { Database, Json } from './database'

// User types
export type { Profile, User, SkillLevel } from './user'

// Artist types
export type { Artist, ArtistWithCifras } from './artist'

// Cifra types
export type {
  Cifra,
  CifraWithArtist,
  CifraPreview,
  CifraWithRelations,
  Difficulty,
  Instrument,
  CifraStatus,
} from './cifra'

// Chord types
export type {
  Chord,
  ChordPosition,
  ChordLine,
  ParsedCifra,
} from './chord'

// Playlist types
export type {
  Playlist,
  PlaylistWithItems,
  PlaylistItem,
} from './playlist'

// Search types
export type {
  SearchResult,
  SearchFilters,
  SearchHistory,
} from './search'

// API types
export type {
  ApiResponse,
  ApiError,
  PaginatedResponse,
} from './api'

// Player types
export type {
  PlayerState,
  MetronomeState,
  TunerState,
} from './player'

// Transpose types
export type {
  ChromaticNote,
  TransposeOptions,
  ChordTransposition,
} from './transpose'

// Form types
export type {
  LoginFormData,
  RegisterFormData,
  CifraFormData,
  ProfileFormData,
  PlaylistFormData,
} from './form'

// UI types
export type {
  TabItem,
  DropdownItem,
  ToastOptions,
  ModalProps,
} from './ui'

// Constants
export {
  INSTRUMENTS,
  DIFFICULTIES,
  SKILL_LEVELS,
  MUSICAL_KEYS,
  CIFRA_STATUS,
} from './constants'