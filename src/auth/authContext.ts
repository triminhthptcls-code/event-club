import { createContext } from 'react'
import type { RegisterInput, User } from '../types/auth'

export interface AuthContextValue {
  user: User | null
  login: (username: string, password: string) => Promise<User>
  register: (input: RegisterInput) => Promise<User>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
