// ============================================
// types/ui.ts
// ============================================

import type { ReactNode } from 'react'

export interface TabItem {
  id: string
  label: string
  content: ReactNode
}

export interface DropdownItem {
  id: string
  label: string
  icon?: ReactNode
  onClick: () => void
  disabled?: boolean
}

export interface ToastOptions {
  title: string
  description?: string
  variant?: 'default' | 'destructive' | 'success'
  duration?: number
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
}