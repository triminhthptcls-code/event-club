import { useCallback, useEffect, useState } from 'react'
import { getEventById } from '../services/eventService'
import type { ClubEvent } from '../types/event'
import { getErrorMessage, isNotFoundError } from '../utils/apiError'

export type EventState =
  | { status: 'loading' }
  | { status: 'success'; event: ClubEvent }
  | { status: 'notfound' }
  | { status: 'error'; message: string }

/** Tải một sự kiện theo id, phân biệt rõ: đang tải / thành công / không tìm thấy / lỗi */
export function useEvent(id: string | undefined): {
  state: EventState
  reload: () => void
} {
  const [state, setState] = useState<EventState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!id) {
      setState({ status: 'notfound' })
      return
    }

    let ignore = false
    setState({ status: 'loading' })

    getEventById(id)
      .then((event) => {
        if (!ignore) setState({ status: 'success', event })
      })
      .catch((error: unknown) => {
        if (ignore) return
        setState(
          isNotFoundError(error)
            ? { status: 'notfound' }
            : { status: 'error', message: getErrorMessage(error) },
        )
      })

    // Bỏ qua kết quả của lần gọi cũ nếu id đổi hoặc component bị gỡ
    return () => {
      ignore = true
    }
  }, [id, attempt])

  const reload = useCallback(() => setAttempt((value) => value + 1), [])

  return { state, reload }
}
