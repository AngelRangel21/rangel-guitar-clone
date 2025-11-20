// lib/services/search.service.ts
import { createClient } from '@/lib/supabase/client'
import type { CifraPreview } from '@/types'

export class SearchService {
  // Búsqueda simple
  static async simpleSearch(query: string, limit = 20): Promise<CifraPreview[]> {
    if (!query || query.trim().length === 0) {
      return []
    }

    const supabase = createClient()
    
    try {
      // Primero buscar por título
      const { data: titleResults, error: titleError } = await supabase
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
        .ilike('title', `%${query}%`)
        .order('views_count', { ascending: false })
        .limit(limit)

      // Luego buscar por artista
      const { data: artistResults, error: artistError } = await supabase
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
        .ilike('artist.name', `%${query}%`)
        .order('views_count', { ascending: false })
        .limit(limit)

      if (titleError && artistError) {
        console.error('Search errors:', { titleError, artistError })
        return []
      }

      // Combinar resultados y eliminar duplicados
      const allResults = [
        ...(titleResults || []),
        ...(artistResults || [])
      ]

      // Eliminar duplicados por ID
      const uniqueResults = allResults.reduce((acc, current) => {
        const exists = acc.find(item => item.id === current.id)
        if (!exists) {
          acc.push(current)
        }
        return acc
      }, [] as typeof allResults)

      // Ordenar por vistas y limitar
      return uniqueResults
        .sort((a, b) => b.views_count - a.views_count)
        .slice(0, limit) as unknown as CifraPreview[]

    } catch (error) {
      console.error('Search exception:', error)
      return []
    }
  }

  // Guardar en historial de búsqueda
  static async saveToHistory(query: string, resultsCount: number): Promise<void> {
    const supabase = createClient()
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      await supabase
        .from('search_history')
        .insert({
          user_id: user.id,
          query,
          results_count: resultsCount
        })
    } catch (error) {
      console.error('Error saving search history:', error)
    }
  }

  // Obtener historial de búsqueda del usuario
  static async getSearchHistory(limit = 10): Promise<Array<{ query: string; created_at: string }>> {
    const supabase = createClient()
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return []

      const { data, error } = await supabase
        .from('search_history')
        .select('query, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Error fetching search history:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Search history exception:', error)
      return []
    }
  }

  // Obtener búsquedas populares
  static async getPopularSearches(limit = 10): Promise<Array<{ query: string; count: number }>> {
    const supabase = createClient()
    
    try {
      const { data, error } = await supabase
        .from('search_history')
        .select('query')
        .limit(1000)

      if (error) {
        console.error('Error fetching popular searches:', error)
        return []
      }

      // Contar ocurrencias
      const counts = (data || []).reduce((acc, item) => {
        acc[item.query] = (acc[item.query] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      // Convertir a array y ordenar
      return Object.entries(counts)
        .map(([query, count]) => ({ query, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit)
    } catch (error) {
      console.error('Popular searches exception:', error)
      return []
    }
  }
}