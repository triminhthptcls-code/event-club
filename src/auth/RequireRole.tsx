import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import NotFoundMessage from '../components/NotFoundMessage'
import { useAuth } from '../hooks/useAuth'
import type { Role } from '../types/auth'

interface RequireRoleProps {
  role: Role
  children: ReactNode
}

/** Chỉ cho phép đúng vai trò vào trang; chưa đăng nhập thì chuyển sang trang đăng nhập */
export default function RequireRole({ role, children }: RequireRoleProps) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/dang-nhap" replace state={{ from: location.pathname }} />
  }
  if (user.role !== role) {
    return (
      <NotFoundMessage
        title="Không có quyền truy cập"
        message={
          role === 'club'
            ? 'Trang này chỉ dành cho tài khoản câu lạc bộ.'
            : 'Trang này chỉ dành cho tài khoản sinh viên.'
        }
      />
    )
  }
  return <>{children}</>
}
