import { useState } from 'react'
import type { ClubEvent } from '../types/event'
import ClubIcon from './ClubIcon'
import { DEFAULT_EVENT_IMAGES } from '../utils/eventImages'
import { MapPinIcon, VideoIcon } from './Icons'

/** Gradient dự phòng khi chưa có ảnh, chọn theo id để các thẻ không giống hệt nhau */
const GRADIENTS = [
  'from-red-900 to-red-600',
  'from-red-800 to-rose-500',
  'from-rose-900 to-red-500',
  'from-stone-800 to-red-700',
  'from-red-950 to-orange-600',
]

/**
 * Đường dẫn ảnh của sự kiện:
 * - ưu tiên trường `image` trong db.json (vd. "/images/events/workshop.jpg")
 * - nếu không có thì dùng quy ước public/images/events/<id>.jpg
 */
export function getEventImage(event: ClubEvent): string {
  return getEventImageCandidates(event)[0]
}

/**
 * Danh sách ảnh thử lần lượt (ảnh nào lỗi thì thử ảnh kế tiếp), để sự kiện vẫn có ảnh
 * dù trường `image` chưa có trong dữ liệu: trường image -> ảnh mặc định -> <id>.svg -> <id>.jpg
 */
function getEventImageCandidates(event: ClubEvent): string[] {
  const list: string[] = []
  if (event.image) list.push(event.image)
  const file = DEFAULT_EVENT_IMAGES[event.id]
  if (file) list.push(`/images/events/${file}`)
  list.push(`/images/events/${event.id}.jpg`, `/images/events/${event.id}.svg`)
  // Bỏ đường dẫn trùng: nếu để trùng thì src không đổi và trình duyệt không thử lại
  return [...new Set(list)]
}

interface EventCoverProps {
  event: ClubEvent
  className?: string
}

export default function EventCover({ event, className = 'h-40' }: EventCoverProps) {
  const candidates = getEventImageCandidates(event)
  const [tried, setTried] = useState(0)
  const failed = tried >= candidates.length
  const gradient = GRADIENTS[(Number(event.id) || 0) % GRADIENTS.length]
  const Icon = event.mode === 'online' ? VideoIcon : MapPinIcon

  return (
    <div className={`relative w-full overflow-hidden bg-gradient-to-br ${gradient} ${className}`}>
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-white/90 p-1 shadow-lg">
            <ClubIcon clubId={event.club} size={96} />
          </div>
        </div>
      )}
      {!failed && (
        <img
          src={candidates[tried]}
          alt={event.name}
          loading="lazy"
          onError={() => setTried((value) => value + 1)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-red-800 shadow">
        <Icon className="h-5 w-5" />
      </div>
    </div>
  )
}
