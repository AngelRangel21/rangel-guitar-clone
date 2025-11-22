// ============================================
// lib/hooks/use-admin.ts - Hook para verificar admin
// ============================================
'use client'

import { useAuthStore } from '@/lib/stores/auth-store'

export function useAdmin() {
  const { profile, isAuthenticated } = useAuthStore()
  
  const isAdmin = isAuthenticated && profile?.role === 'admin'
  
  return {
    isAdmin,
    role: profile?.role || 'user',
  }
}