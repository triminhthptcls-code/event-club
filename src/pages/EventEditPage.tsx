import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import EventForm from '../components/EventForm'
import Loading from '../components/Loading'
import NotFoundMessage from '../components/NotFoundMessage'
import { useAuth } from '../hooks/useAuth'
import { useEvent } from '../hooks/useEvent'
import { useToast } from '../hooks/useToast'
import { updateEvent } from '../services/eventService'
import { getRegistrationsByEvent } from '../services/registrationService'
import type { EventPayload } from '../types/event'
import { getErrorMessage } from '../utils/apiError'
import { toFormValues } from '../utils/eventForm'

export default function EventEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { showToast } = useToast()
  const { state, reload } = useEvent(id)
  const [registeredCount, setRegisteredCount] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Số người đã đăng ký: dùng để chặn giảm số chỗ xuống thấp hơn
  useEffect(() => {
    if (!id) return
    let ignore = false
    getRegistrationsByEvent(id)
      .then((items) => {
        if (!ignore) setRegisteredCount(items.length)
      })
      .catch(() => undefined)
    return () => {
      ignore = true
    }
  }, [id])

  if (state.status === 'loading') return <Loading />
  if (state.status === 'error') {
    return <ErrorMessage message={state.message} onRetry={reload} />
  }
  if (state.status === 'notfound') {
    return (
      <NotFoundMessage
        title="Không tìm thấy sự kiện"
        message="Không thể chỉnh sửa vì sự kiện này không tồn tại hoặc đã bị xóa."
      />
    )
  }

  const { event } = state

  if (user?.role !== 'club' || user.clubId !== event.club) {
    return (
      <NotFoundMessage
        title="Không có quyền chỉnh sửa"
        message="Chỉ tài khoản của câu lạc bộ tổ chức mới được sửa sự kiện này."
      />
    )
  }

  const handleSubmit = async (payload: EventPayload) => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      await updateEvent(event.id, payload)
      showToast('Đã cập nhật sự kiện thành công.')
      navigate(`/su-kien/${event.id}`)
    } catch (error: unknown) {
      setSubmitError(getErrorMessage(error))
      setSubmitting(false)
    }
  }

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold text-slate-900">Chỉnh sửa sự kiện</h1>
      <EventForm
        key={event.id}
        initialValues={toFormValues(event)}
        lockClub
        registeredCount={registeredCount}
        isEdit
        submitting={submitting}
        submitLabel="Lưu thay đổi"
        submitError={submitError}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/su-kien/${event.id}`)}
      />
    </>
  )
}
