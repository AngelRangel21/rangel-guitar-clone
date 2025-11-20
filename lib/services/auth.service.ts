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
        .maybeSingle() // Cambiado de .single() a .maybeSingle()

      console.log('🔍 Verificando username:', username)
      console.log('📊 Resultado:', { data, error })

      // Si hay error y no es "no rows", entonces hay un problema
      if (error && error.code !== 'PGRST116') {
        console.error('❌ Error verificando username:', error)
        return false
      }

      // Si data es null, el username está disponible
      const isAvailable = data === null
      console.log(isAvailable ? '✅ Username disponible' : '❌ Username ya existe')
      
      return isAvailable
    } catch (error) {
      console.error('❌ Exception verificando username:', error)
      return false
    }
  }

  // Registrar nuevo usuario
  static async signUp(data: RegisterFormData) {
    const supabase = createClient()

    console.log('📝 Iniciando registro:', {
      email: data.email,
      username: data.username,
    })

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            username: data.username,
            full_name: data.full_name || data.username,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (authError) {
        console.error('❌ Error en auth.signUp:', authError)
        return { error: authError.message }
      }

      console.log('✅ Usuario creado:', authData.user?.id)

      // Esperar un momento para que el trigger cree el perfil
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Verificar que el perfil se creó
      if (authData.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single()

        if (profileError) {
          console.error('❌ Error obteniendo perfil:', profileError)
          // Intentar crear el perfil manualmente si no existe
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: authData.user.id,
              username: data.username,
              full_name: data.full_name || data.username,
            })

          if (insertError) {
            console.error('❌ Error creando perfil manualmente:', insertError)
            return { error: 'Error al crear el perfil de usuario' }
          }
        }

        console.log('✅ Perfil verificado/creado:', profile?.username)
      }

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
        console.error('❌ Error en signIn:', error)
        return { error: error.message }
      }

      console.log('✅ Login exitoso:', authData.user?.id)
      return { data: authData, error: null }
    } catch (error: any) {
      console.error('❌ Exception en signIn:', error)
      return { error: error.message || 'Error al iniciar sesión' }
    }
  }

  // Cerrar sesión
  static async signOut() {
    const supabase = createClient()
    
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        return { error: error.message }
      }

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

      if (error) {
        return { error: error.message }
      }

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

      if (error) {
        return { error: error.message }
      }

      return { error: null }
    } catch (error: any) {
      return { error: error.message }
    }
  }
}