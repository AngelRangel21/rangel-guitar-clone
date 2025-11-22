// lib/services/auth.service.ts
import { createClient } from '@/lib/supabase/client'
import type { LoginFormData, RegisterFormData } from '@/types'

export class AuthService {
  // Verificar username disponible
  static async isUsernameAvailable(username: string): Promise<boolean> {
    const supabase = createClient()

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .maybeSingle()

      if (error && error.code !== 'PGRST116') {
        console.error('Error verificando username:', error)
        return false
      }

      return data === null
    } catch (error) {
      console.error('Exception verificando username:', error)
      return false
    }
  }

  // Registrar nuevo usuario
  static async signUp(data: RegisterFormData) {
    const supabase = createClient()

    try {
      console.log('🚀 Iniciando registro...')

      // Paso 1: Crear usuario en Supabase Auth (SIN metadata por ahora)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (authError) {
        console.error('❌ Error en auth.signUp:', authError)
        return { error: authError.message }
      }

      if (!authData.user) {
        return { error: 'No se pudo crear el usuario' }
      }

      console.log('✅ Usuario creado en auth:', authData.user.id)

      // Paso 2: Crear perfil manualmente
      console.log('📝 Creando perfil...')
      
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          username: data.username,
          full_name: data.full_name || data.username,
          role: 'user',
        })
        .select()
        .single()

      if (profileError) {
        console.error('❌ Error creando perfil:', profileError)
        
        // Si falla, intentar eliminar el usuario de auth para limpiar
        await supabase.auth.admin.deleteUser(authData.user.id)
        
        return { 
          error: 'Error al crear el perfil de usuario. Por favor intenta de nuevo.' 
        }
      }

      console.log('✅ Perfil creado exitosamente:', profile.username)

      return { data: authData, error: null }
    } catch (error: any) {
      console.error('❌ Exception en signUp:', error)
      return { error: error.message || 'Error desconocido al registrar' }
    }
  }

  // Iniciar sesión
  static async signIn(data: LoginFormData) {
    const supabase = createClient()

    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) {
        return { error: error.message }
      }

      return { data: authData, error: null }
    } catch (error: any) {
      return { error: error.message || 'Error al iniciar sesión' }
    }
  }

  // Cerrar sesión
  static async signOut() {
    const supabase = createClient()
    
    try {
      const { error } = await supabase.auth.signOut()
      if (error) return { error: error.message }
      return { error: null }
    } catch (error: any) {
      return { error: error.message }
    }
  }

  // Recuperar contraseña
  static async resetPassword(email: string) {
    const supabase = createClient()

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) return { error: error.message }
      return { error: null }
    } catch (error: any) {
      return { error: error.message }
    }
  }

  // Actualizar contraseña
  static async updatePassword(newPassword: string) {
    const supabase = createClient()

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) return { error: error.message }
      return { error: null }
    } catch (error: any) {
      return { error: error.message }
    }
  }
}