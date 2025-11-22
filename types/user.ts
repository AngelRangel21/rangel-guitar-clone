// ============================================
// types/user.ts
// ============================================

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

export interface Profile {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  instrument: string | null
  skill_level: SkillLevel | null
  created_at: string
  updated_at: string
  role: 'user' | 'admin' | 'moderator'
}

export interface User {
  id: string
  email: string
  profile: Profile
}