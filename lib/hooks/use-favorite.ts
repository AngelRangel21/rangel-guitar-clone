// ============================================
// lib/hooks/use-favorite.ts - Hook para manejar favoritos
// ============================================
'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/lib/stores/auth-store'
import { FavoriteService } from '@/lib/services/favorite.service'
import { toast } from 'sonner'

export function useFavorite(cifraId: string) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Verificar si es favorito al montar
  useEffect(() => {
    if (isAuthenticated && cifraId) {
      FavoriteService.isFavorite(cifraId).then(setIsFavorite)
    }
  }, [isAuthenticated, cifraId])

  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión', {
        description: 'Inicia sesión para agregar favoritos',
      })
      return
    }

    setIsLoading(true)

    const success = await FavoriteService.toggle(cifraId)

    if (success) {
      setIsFavorite(!isFavorite)
      toast.success(
        isFavorite ? 'Eliminado de favoritos' : 'Agregado a favoritos',
        {
          description: isFavorite
            ? 'La cifra fue eliminada de tus favoritos'
            : 'La cifra fue agregada a tus favoritos',
        }
      )
    } else {
      toast.error('Error al actualizar favorito')
    }

    setIsLoading(false)
  }

  return {
    isFavorite,
    isLoading,
    toggleFavorite,
  }
}
