// ============================================
// lib/services/playlist.service.ts
// ============================================
import type { Playlist, PlaylistWithItems } from '@/types'
import { createClient } from '../supabase/client'

export class PlaylistService {
  // Obtener playlists del usuario
  static async getUserPlaylists(): Promise<Playlist[]> {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return []

    const { data, error } = await supabase
      .from('playlists')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching playlists:', error)
      return []
    }

    return data as Playlist[]
  }

  // Obtener playlist con items
  static async getById(id: string): Promise<PlaylistWithItems | null> {
    const supabase = createClient()
    
    const { data: playlist, error: playlistError } = await supabase
      .from('playlists')
      .select('*')
      .eq('id', id)
      .single()

    if (playlistError) {
      console.error('Error fetching playlist:', playlistError)
      return null
    }

    const { data: items, error: itemsError } = await supabase
      .from('playlist_items')
      .select(`
        *,
        cifra:cifras(
          id,
          title,
          slug,
          original_key,
          difficulty,
          views_count,
          favorites_count,
          rating,
          artist:artists(name, slug)
        )
      `)
      .eq('playlist_id', id)
      .order('position', { ascending: true })

    if (itemsError) {
      console.error('Error fetching playlist items:', itemsError)
      return { ...playlist, items: [] } as PlaylistWithItems
    }

    return {
      ...playlist,
      items: items as unknown
    } as PlaylistWithItems
  }

  // Crear playlist
  static async create(name: string, description?: string, isPublic = false): Promise<Playlist | null> {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      console.error('User not authenticated')
      return null
    }

    const { data, error } = await supabase
      .from('playlists')
      .insert({
        user_id: user.id,
        name,
        description,
        is_public: isPublic
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating playlist:', error)
      return null
    }

    return data as Playlist
  }

  // Agregar cifra a playlist
  static async addCifra(playlistId: string, cifraId: string): Promise<boolean> {
    const supabase = createClient()
    
    // Obtener la última posición
    const { data: lastItem } = await supabase
      .from('playlist_items')
      .select('position')
      .eq('playlist_id', playlistId)
      .order('position', { ascending: false })
      .limit(1)
      .single()

    const nextPosition = lastItem ? lastItem.position + 1 : 0

    const { error } = await supabase
      .from('playlist_items')
      .insert({
        playlist_id: playlistId,
        cifra_id: cifraId,
        position: nextPosition
      })

    if (error) {
      console.error('Error adding cifra to playlist:', error)
      return false
    }

    return true
  }

  // Eliminar cifra de playlist
  static async removeCifra(playlistId: string, cifraId: string): Promise<boolean> {
    const supabase = createClient()
    
    const { error } = await supabase
      .from('playlist_items')
      .delete()
      .eq('playlist_id', playlistId)
      .eq('cifra_id', cifraId)

    if (error) {
      console.error('Error removing cifra from playlist:', error)
      return false
    }

    return true
  }

  // Eliminar playlist
  static async delete(id: string): Promise<boolean> {
    const supabase = createClient()
    
    const { error } = await supabase
      .from('playlists')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting playlist:', error)
      return false
    }

    return true
  }
}