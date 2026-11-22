import { useEffect } from 'react'
import type { ReactNode } from 'react'
import Button from './Button'

interface ConfirmDialogProps {
  title: string
  message: ReactNode
  confirmLabel?: string
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

/** Hộp xác nhận tự viết, thay cho window.confirm() */
export default function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Xác nhận',
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  // Nhấn Esc để đóng (trừ khi đang xử lý)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !loading) onCancel()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [loading, onCancel])

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={() => {
        if (!loading) onCancel()
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="confirm-title" className="text-lg font-semibold text-slate-900">
          {title}
        </h2>
        <div className="mt-2 text-sm text-slate-600">{message}</div>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onCancel} disabled={loading} autoFocus>
            Hủy
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            loading={loading}
            loadingText="Đang xóa..."
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
