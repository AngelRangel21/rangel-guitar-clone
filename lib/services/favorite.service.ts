// ============================================
// lib/services/favorite.service.ts
// ============================================

import { CifraPreview } from "@/types"
import { createClient } from "../supabase/client"

export class FavoriteService {
  // Verificar si una cifra es favorita
  static async isFavorite(cifraId: string): Promise<boolean> {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return false

    const { data, error } = await supabase
      .from('favorites')
      .select('cifra_id')
      .eq('user_id', user.id)
      .eq('cifra_id', cifraId)
      .single()

    return !!data && !error
  }

  // Agregar a favoritos
  static async add(cifraId: string): Promise<boolean> {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      console.error('User not authenticated')
      return false
    }

    const { error } = await supabase
      .from('favorites')
      .insert({
        user_id: user.id,
        cifra_id: cifraId
      })

    if (error) {
      console.error('Error adding favorite:', error)
      return false
    }

    return true
  }

  // Quitar de favoritos
  static async remove(cifraId: string): Promise<boolean> {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      console.error('User not authenticated')
      return false
    }

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('cifra_id', cifraId)

    if (error) {
      console.error('Error removing favorite:', error)
      return false
    }

    return true
  }

  // Alternar favorito
  static async toggle(cifraId: string): Promise<boolean> {
    const isFav = await this.isFavorite(cifraId)
    
    if (isFav) {
      return await this.remove(cifraId)
    } else {
      return await this.add(cifraId)
    }
  }

  // Obtener favoritos del usuario
  static async getUserFavorites(limit = 50): Promise<CifraPreview[]> {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return []

    const { data, error } = await supabase
      .from('favorites')
      .select(`
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
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching favorites:', error)
      return []
    }

    return data.map(item => item.cifra) as unknown as CifraPreview[]
  }
}