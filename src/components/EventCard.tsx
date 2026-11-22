import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { EventWithSeats } from '../types/event'
import { formatDate } from '../utils/date'
import { buttonClasses } from '../utils/ui'
import Button from './Button'
import ClubBadge from './ClubBadge'
import EventCover from './EventCover'
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from './Icons'
import ModeBadge from './ModeBadge'
import SeatBadge from './SeatBadge'

interface EventCardProps {
  event: EventWithSeats
  onDelete: (event: EventWithSeats) => void
}

export default function EventCard({ event, onDelete }: EventCardProps) {
  const { user } = useAuth()
  const canManage = user?.role === 'club' && user.clubId === event.club

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link to={`/su-kien/${event.id}`} aria-label={event.name}>
        <EventCover event={event} className="h-44 transition duration-300 group-hover:brightness-105" />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-snug text-slate-900">
            <Link to={`/su-kien/${event.id}`} className="hover:text-ftu">
              {event.name}
            </Link>
          </h3>
          <ModeBadge mode={event.mode} />
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <ClubBadge clubId={event.club} />
          <SeatBadge registered={event.registered} maxSeats={event.maxSeats} />
        </div>

        <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
          <li className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 shrink-0 text-ftu" />
            {formatDate(event.date)}
          </li>
          <li className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 shrink-0 text-ftu" />
            {event.startTime} - {event.endTime}
          </li>
          <li className="flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 shrink-0 text-ftu" />
            {event.mode === 'offline' ? event.location : 'Tham gia qua đường dẫn trực tuyến'}
          </li>
          <li className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4 shrink-0 text-ftu" />
            {event.registered}/{event.maxSeats} người đã đăng ký
          </li>
        </ul>

        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          <Link to={`/su-kien/${event.id}`} className={buttonClasses('secondary', 'sm')}>
            {canManage ? 'Xem' : 'Xem / Đăng ký'}
          </Link>
          {canManage && (
            <>
              <Link to={`/su-kien/${event.id}/sua`} className={buttonClasses('secondary', 'sm')}>
                Sửa
              </Link>
              <Button variant="danger" size="sm" onClick={() => onDelete(event)}>
                Xóa
              </Button>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
