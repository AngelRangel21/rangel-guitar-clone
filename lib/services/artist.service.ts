// ============================================
// lib/services/artist.service.ts - ACTUALIZADO (si hace falta)
// ============================================
import { createClient } from '@/lib/supabase/client'
import { CifraService } from './cifra.service'
import type { Artist, ArtistWithCifras } from '@/types'

export class ArtistService {
  // Obtener artista por ID
  static async getById(id: string): Promise<Artist | null> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching artist:', error)
      return null
    }

    return data as Artist
  }

  // Obtener artista por slug (con cifras)
  static async getBySlug(slug: string): Promise<ArtistWithCifras | null> {
    const supabase = createClient()
    
    const { data: artist, error: artistError } = await supabase
      .from('artists')
      .select('*')
      .eq('slug', slug)
      .single()

    if (artistError) {
      console.error('Error fetching artist:', artistError)
      return null
    }

    // Obtener cifras del artista
    const cifras = await CifraService.getByArtist(artist.id)

    return {
      ...artist,
      cifras
    } as ArtistWithCifras
  }

  // Obtener artistas populares
  static async getPopular(limit = 20): Promise<Artist[]> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .order('cifras_count', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching popular artists:', error)
      return []
    }

    return data as Artist[]
  }

  // Buscar artistas
  static async search(query: string, limit = 10): Promise<Artist[]> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .ilike('name', `%${query}%`)
      .order('cifras_count', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error searching artists:', error)
      return []
    }

    return data as Artist[]
  }

  // Crear artista
  static async create(artist: Partial<Artist>): Promise<Artist | null> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('artists')
      .insert(artist)
      .select()
      .single()

    if (error) {
      console.error('Error creating artist:', error)
      return null
    }

    return data as Artist
  }
}