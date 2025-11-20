// ============================================
// lib/stores/auth-store.ts - Estado global de autenticación
// ============================================
import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'
import type { User, Profile } from '@/types'

interface AuthState {
  user: User | null
  profile: Profile | null
  isLoading: boolean
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setProfile: (profile: Profile | null) => void
  setLoading: (loading: boolean) => void
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  setProfile: (profile) => set({ profile }),
  
  setLoading: (isLoading) => set({ isLoading }),

  signOut: async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    set({ user: null, profile: null, isAuthenticated: false })
  },

  refreshUser: async () => {
    const supabase = createClient()
    set({ isLoading: true })
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Obtener perfil
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        set({
          user: { id: user.id, email: user.email!, profile: profile! },
          profile: profile!,
          isAuthenticated: true,
        })
      } else {
        set({ user: null, profile: null, isAuthenticated: false })
      }
    } catch (error) {
      console.error('Error refreshing user:', error)
      set({ user: null, profile: null, isAuthenticated: false })
    } finally {
      set({ isLoading: false })
    }
  },
}))