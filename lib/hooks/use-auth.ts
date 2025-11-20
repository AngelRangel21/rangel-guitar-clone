// ============================================
// lib/hooks/use-auth.ts - Hook personalizado
// ============================================
import { useEffect } from 'react'
import { useAuthStore } from '@/lib/stores/auth-store'
import { createClient } from '@/lib/supabase/client'

export function useAuth() {
  const { user, profile, isLoading, isAuthenticated, refreshUser, signOut } = useAuthStore()

  useEffect(() => {
    // Cargar usuario inicial
    refreshUser()

    // Escuchar cambios de autenticación
    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        refreshUser()
      } else {
        useAuthStore.setState({ 
          user: null, 
          profile: null, 
          isAuthenticated: false,
          isLoading: false 
        })
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [refreshUser])

  return {
    user,
    profile,
    isLoading,
    isAuthenticated,
    signOut,
    refreshUser,
  }
}