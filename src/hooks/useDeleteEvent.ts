import { useState } from 'react'
import { deleteEvent } from '../services/eventService'
import type { ClubEvent } from '../types/event'
import { getErrorMessage } from '../utils/apiError'
import { useToast } from './useToast'

/**
 * Luồng xóa dùng chung cho trang danh sách và trang chi tiết:
 * bấm Xóa -> hỏi xác nhận (target) -> gọi API -> thông báo -> onDeleted.
 */
export function useDeleteEvent(onDeleted: () => void) {
  const { showToast } = useToast()
  const [target, setTarget] = useState<ClubEvent | null>(null)
  const [deleting, setDeleting] = useState(false)

  const request = (event: ClubEvent) => setTarget(event)

  const cancel = () => {
    if (!deleting) setTarget(null)
  }

  const confirm = async () => {
    if (!target || deleting) return
    setDeleting(true)
    try {
      await deleteEvent(target.id)
      showToast(`Đã xóa sự kiện "${target.name}".`)
      setTarget(null)
      onDeleted()
    } catch (error: unknown) {
      showToast(getErrorMessage(error), 'error')
      setTarget(null)
    } finally {
      setDeleting(false)
    }
  }

  return { target, deleting, request, cancel, confirm }
}
