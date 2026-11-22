import { useContext } from 'react'
import { ToastContext } from '../components/toast/toastContext'
import type { ToastContextValue } from '../components/toast/toastContext'

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast phải được dùng bên trong ToastProvider')
  }
  return context
}
