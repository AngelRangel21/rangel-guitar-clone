// ============================================
// types/api.ts
// ============================================

export interface ApiResponse<T> {
  data: T | null
  error: ApiError | null
  status: number
}

export interface ApiError {
  message: string
  code?: string
  details?: unknown
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}