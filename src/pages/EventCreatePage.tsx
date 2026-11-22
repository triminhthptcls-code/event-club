import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EventForm from '../components/EventForm'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { createEvent } from '../services/eventService'
import type { EventPayload } from '../types/event'
import { getErrorMessage } from '../utils/apiError'
import { EMPTY_FORM_VALUES } from '../utils/eventForm'

export default function EventCreatePage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { showToast } = useToast()
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (payload: EventPayload) => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const created = await createEvent(payload)
      showToast('Đã thêm sự kiện mới thành công.')
      navigate(`/su-kien/${created.id}`)
    } catch (error: unknown) {
      setSubmitError(getErrorMessage(error))
      setSubmitting(false)
    }
  }

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold text-slate-900">Thêm sự kiện mới</h1>
      <EventForm
        initialValues={{ ...EMPTY_FORM_VALUES, club: user?.clubId ?? '' }}
        lockClub
        isEdit={false}
        submitting={submitting}
        submitLabel="Thêm sự kiện"
        submitError={submitError}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/su-kien')}
      />
    </>
  )
}
