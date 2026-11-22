import type { EventMode } from '../types/event'

/** Số sự kiện mỗi trang (mỗi nhóm phân trang riêng) */
export const PER_PAGE = 4

export const MODE_LABELS: Record<EventMode, string> = {
  offline: 'Trực tiếp',
  online: 'Trực tuyến',
}

export const MODE_OPTIONS: { value: EventMode; label: string }[] = [
  { value: 'offline', label: MODE_LABELS.offline },
  { value: 'online', label: MODE_LABELS.online },
]
