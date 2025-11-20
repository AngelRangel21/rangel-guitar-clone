// ============================================
// lib/hooks/use-rating.ts - Hook para manejar calificaciones
// ============================================
'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/lib/stores/auth-store'
import { RatingService } from '@/lib/services/rating.service'
import { toast } from 'sonner'

export function useRating(cifraId: string) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const [userRating, setUserRating] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hoverRating, setHoverRating] = useState<number | null>(null)

  // Cargar rating del usuario al montar
  useEffect(() => {
    if (isAuthenticated && cifraId) {
      RatingService.getUserRating(cifraId).then(setUserRating)
    }
  }, [isAuthenticated, cifraId])

  const rate = async (rating: number) => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión', {
        description: 'Inicia sesión para calificar cifras',
      })
      return
    }

    if (rating < 1 || rating > 5) {
      toast.error('Calificación inválida')
      return
    }

    setIsLoading(true)

    const success = await RatingService.rate(cifraId, rating)

    if (success) {
      setUserRating(rating)
      toast.success('Calificación guardada', {
        description: `Calificaste con ${rating} ${rating === 1 ? 'estrella' : 'estrellas'}`,
      })
    } else {
      toast.error('Error al guardar calificación')
    }

    setIsLoading(false)
  }

  return {
    userRating,
    isLoading,
    hoverRating,
    setHoverRating,
    rate,
  }
}









