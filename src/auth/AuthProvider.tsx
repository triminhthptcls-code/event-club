import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { login as loginRequest, registerStudent } from '../services/authService'
import type { RegisterInput, User } from '../types/auth'
import { AuthContext } from './authContext'
import type { AuthContextValue } from './authContext'

const STORAGE_KEY = 'ftu-club-events:user'

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

function saveUser(user: User | null) {
  try {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Trình duyệt chặn localStorage: bỏ qua, phiên đăng nhập chỉ còn trong bộ nhớ
  }
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadUser)

  const login = useCallback(async (username: string, password: string) => {
    const next = await loginRequest(username, password)
    saveUser(next)
    setUser(next)
    return next
  }, [])

  const register = useCallback(async (input: RegisterInput) => {
    const next = await registerStudent(input)
    saveUser(next)
    setUser(next)
    return next
  }, [])

  const logout = useCallback(() => {
    saveUser(null)
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, login, register, logout }),
    [user, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
