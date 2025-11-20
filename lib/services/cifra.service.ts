// lib/services/cifra.service.ts
import { createClient } from '@/lib/supabase/client'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { Cifra, CifraWithArtist, CifraPreview } from '@/types'

export class CifraService {
  // ========================================
  // MÉTODOS PARA SERVER COMPONENTS
  // ========================================
  
  // Obtener cifra por ID (Server Side)
  static async getByIdServer(id: string): Promise<CifraWithArtist | null> {
    const supabase = await createServerSupabaseClient()
    
    const { data, error } = await supabase
      .from('cifras')
      .select(`
        *,
        artist:artists(*)
      `)
      .eq('id', id)
      .eq('status', 'published')
      .single()

    if (error) {
      console.error('Error fetching cifra:', error)
      return null
    }

    return data as CifraWithArtist
  }

  // ========================================
  // MÉTODOS PARA CLIENT COMPONENTS
  // ========================================
  
  // Obtener cifra por ID (Client Side)
  static async getById(id: string): Promise<CifraWithArtist | null> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('cifras')
      .select(`
        *,
        artist:artists(*)
      `)
      .eq('id', id)
      .eq('status', 'published')
      .single()

    if (error) {
      console.error('Error fetching cifra:', error)
      return null
    }

    return data as CifraWithArtist
  }

  static async getBySlugServer(slug: string): Promise<CifraWithArtist | null> {
    const supabase = await createServerSupabaseClient()
    
    const { data, error } = await supabase
      .from('cifras')
      .select(`
        *,
        artist:artists(*)
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) {
      console.error('Error fetching cifra:', error)
      return null
    }

    return data as CifraWithArtist
  }

  // Obtener cifra por slug de artista y slug de cifra
  static async getBySlug(artistSlug: string, cifraSlug: string): Promise<CifraWithArtist | null> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('cifras')
      .select(`
        *,
        artist:artists(*)
      `)
      .eq('slug', cifraSlug)
      .eq('status', 'published')
      .single()

    if (error) {
      console.error('Error fetching cifra by slug:', error)
      return null
    }

    // Verificar que el artista coincida
    if (data.artist.slug !== artistSlug) {
      return null
    }

    return data as CifraWithArtist
  }

  // Obtener cifras más vistas
  static async getTrending(limit = 10): Promise<CifraPreview[]> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('cifras')
      .select(`
        id,
        title,
        slug,
        original_key,
        difficulty,
        views_count,
        favorites_count,
        rating,
        artist:artists!inner(name, slug)
      `)
      .eq('status', 'published')
      .order('views_count', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching trending cifras:', error)
      return []
    }

    return data as unknown as CifraPreview[]
  }

  // Obtener cifras recientes
  static async getRecent(limit = 10): Promise<CifraPreview[]> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('cifras')
      .select(`
        id,
        title,
        slug,
        original_key,
        difficulty,
        views_count,
        favorites_count,
        rating,
        artist:artists!inner(name, slug)
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching recent cifras:', error)
      return []
    }

    return data as unknown as CifraPreview[]
  }

  // Obtener cifras por artista
  static async getByArtist(artistId: string, limit = 50): Promise<CifraPreview[]> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('cifras')
      .select(`
        id,
        title,
        slug,
        original_key,
        difficulty,
        views_count,
        favorites_count,
        rating,
        artist:artists!inner(name, slug)
      `)
      .eq('artist_id', artistId)
      .eq('status', 'published')
      .order('views_count', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching artist cifras:', error)
      return []
    }

    return data as unknown as CifraPreview[]
  }

  // Incrementar contador de vistas
  static async incrementViews(id: string): Promise<void> {
    const supabase = createClient()
    
    // Usar RPC si existe, sino actualizar directamente
    const { error } = await supabase
      .from('cifras')
      .update({ views_count: supabase.rpc('increment', { x: 1 }) })
      .eq('id', id)

    if (error) {
      console.error('Error incrementing views:', error)
    }
  }

  // Crear nueva cifra (requiere autenticación)
  static async create(cifra: Partial<Cifra>): Promise<Cifra | null> {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      console.error('User not authenticated')
      return null
    }

    const { data, error } = await supabase
      .from('cifras')
      .insert({
        ...cifra,
        created_by: user.id,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating cifra:', error)
      return null
    }

    return data as Cifra
  }

  // Actualizar cifra
  static async update(id: string, updates: Partial<Cifra>): Promise<Cifra | null> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('cifras')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating cifra:', error)
      return null
    }

    return data as Cifra
  }

  // Eliminar cifra
  static async delete(id: string): Promise<boolean> {
    const supabase = createClient()
    
    const { error } = await supabase
      .from('cifras')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting cifra:', error)
      return false
    }

    return true
  }
}