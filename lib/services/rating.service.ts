// ============================================
// lib/services/rating.service.ts
// ============================================

import { createClient } from "../supabase/client"

export class RatingService {
  // Obtener rating del usuario para una cifra
  static async getUserRating(cifraId: string): Promise<number | null> {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return null

    const { data, error } = await supabase
      .from('ratings')
      .select('rating')
      .eq('user_id', user.id)
      .eq('cifra_id', cifraId)
      .single()

    if (error) return null

    return data.rating
  }

  // Calificar cifra
  static async rate(cifraId: string, rating: number): Promise<boolean> {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      console.error('User not authenticated')
      return false
    }

    if (rating < 1 || rating > 5) {
      console.error('Rating must be between 1 and 5')
      return false
    }

    const { error } = await supabase
      .from('ratings')
      .upsert({
        user_id: user.id,
        cifra_id: cifraId,
        rating
      })

    if (error) {
      console.error('Error rating cifra:', error)
      return false
    }

    return true
  }
}