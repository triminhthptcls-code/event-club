import { useEffect, useState } from 'react'
import { getEvents } from '../services/eventService'
import type { ClubEvent, EventStatus, EventWithSeats } from '../types/event'
import { getErrorMessage } from '../utils/apiError'
import { PER_PAGE } from '../utils/constants'
import EmptyState from './EmptyState'
import ErrorMessage from './ErrorMessage'
import EventCard from './EventCard'
import Loading from './Loading'
import Pagination from './Pagination'

interface EventSectionProps {
  title: string
  status: EventStatus
  /** Từ khóa tìm kiếm (đã debounce), được gửi lên API */
  search: string
  /** Các mã CLB đang lọc; rỗng = tất cả */
  clubs: string[]
  /** true: chỉ hiện sự kiện còn chỗ */
  onlyAvailable: boolean
  /** Đổi giá trị này để buộc tải lại (sau khi xóa) */
  refreshKey: number
  onDelete: (event: ClubEvent) => void
}

type SectionState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; items: EventWithSeats[]; total: number; pages: number }

/** Một nhóm trong danh sách ("Sắp diễn ra" hoặc "Đã diễn ra"), tự tải dữ liệu và phân trang riêng */
export default function EventSection({
  title,
  status,
  search,
  clubs,
  onlyAvailable,
  refreshKey,
  onDelete,
}: EventSectionProps) {
  const [page, setPage] = useState(1)
  const [state, setState] = useState<SectionState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let ignore = false
    setState({ status: 'loading' })

    getEvents({ status, page, perPage: PER_PAGE, search, clubs, onlyAvailable })
      .then((result) => {
        if (ignore) return
        // Xóa hết sự kiện ở trang cuối -> lùi về trang cuối còn dữ liệu
        if (result.pages > 0 && page > result.pages) {
          setPage(result.pages)
          return
        }
        setState({ status: 'success', ...result })
      })
      .catch((error: unknown) => {
        if (!ignore) setState({ status: 'error', message: getErrorMessage(error) })
      })

    return () => {
      ignore = true
    }
  }, [status, page, search, clubs, onlyAvailable, refreshKey, attempt])

  const emptyMessage = search.trim()
    ? `Không có sự kiện nào khớp với "${search.trim()}".`
    : clubs.length > 0 || onlyAvailable
      ? 'Không có sự kiện nào phù hợp với bộ lọc đã chọn.'
    : status === 'upcoming'
      ? 'Chưa có sự kiện nào sắp diễn ra.'
      : 'Chưa có sự kiện nào đã diễn ra.'

  return (
    <section className="mt-8">
      <h2 className="mb-4 border-l-4 border-ftu bg-slate-50 px-3 py-2 text-base font-semibold uppercase tracking-wide text-ftu">
        {title}
        {state.status === 'success' && (
          <span className="ml-2 text-sm font-normal text-slate-500">
            ({state.total})
          </span>
        )}
      </h2>

      {state.status === 'loading' && <Loading />}

      {state.status === 'error' && (
        <ErrorMessage
          message={state.message}
          onRetry={() => setAttempt((value) => value + 1)}
        />
      )}

      {state.status === 'success' &&
        (state.items.length === 0 ? (
          <EmptyState message={emptyMessage} />
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {state.items.map((event) => (
                <EventCard key={event.id} event={event} onDelete={onDelete} />
              ))}
            </div>
            {state.pages > 1 && (
              <Pagination page={page} pages={state.pages} onChange={setPage} />
            )}
          </>
        ))}
    </section>
  )
}
