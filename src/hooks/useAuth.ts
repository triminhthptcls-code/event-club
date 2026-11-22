import { useContext } from 'react'
import { AuthContext } from '../auth/authContext'
import type { AuthContextValue } from '../auth/authContext'

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth phải được dùng bên trong AuthProvider')
  }
  return context
}
