// ============================================
// lib/stores/cifra-store.ts - Store para estado de cifra
// ============================================
import { create } from 'zustand'

interface CifraState {
  transpose: number
  fontSize: number
  isAutoScrolling: boolean
  scrollSpeed: number
  
  setTranspose: (steps: number) => void
  resetTranspose: () => void
  setFontSize: (size: number) => void
  setAutoScrolling: (isScrolling: boolean) => void
  setScrollSpeed: (speed: number) => void
  reset: () => void
}

const DEFAULT_FONT_SIZE = 16
const DEFAULT_SCROLL_SPEED = 2

export const useCifraStore = create<CifraState>((set) => ({
  transpose: 0,
  fontSize: DEFAULT_FONT_SIZE,
  isAutoScrolling: false,
  scrollSpeed: DEFAULT_SCROLL_SPEED,
  
  setTranspose: (steps) => set({ transpose: steps }),
  resetTranspose: () => set({ transpose: 0 }),
  setFontSize: (size) => set({ fontSize: size }),
  setAutoScrolling: (isScrolling) => set({ isAutoScrolling: isScrolling }),
  setScrollSpeed: (speed) => set({ scrollSpeed: speed }),
  reset: () => set({ 
    transpose: 0, 
    fontSize: DEFAULT_FONT_SIZE,
    isAutoScrolling: false,
    scrollSpeed: DEFAULT_SCROLL_SPEED 
  }),
}))