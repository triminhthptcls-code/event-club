import { getToday } from '../utils/date'
import { http } from './http'
import { getAllRegistrations } from './registrationService'

/** Mỗi sự kiện đã tham dự được cộng bấy nhiêu điểm rèn luyện (ĐRL) */
export const POINTS_PER_EVENT = 2
/** Điểm rèn luyện tối đa (thang 100) */
export const MAX_POINTS = 100

/** Đổi số sự kiện đã tham dự thành điểm ĐRL, không vượt quá thang điểm */
export function toPoints(attendedEvents: number): number {
  return Math.min(MAX_POINTS, attendedEvents * POINTS_PER_EVENT)
}

/**
 * Số sự kiện đã tham dự của từng sinh viên (userId -> số sự kiện).
 * Quy ước: đã đăng ký và sự kiện đã diễn ra (ngày < hôm nay) thì được tính là đã tham dự.
 */
export async function getAttendedCounts(): Promise<Map<string, number>> {
  const [registrations, events] = await Promise.all([
    getAllRegistrations(),
    http.get<{ id: string; date: string }[]>('/events').then((response) => response.data),
  ])
  const today = getToday()
  const pastIds = new Set(events.filter((event) => event.date < today).map((event) => event.id))
  const counts = new Map<string, number>()
  for (const item of registrations) {
    if (pastIds.has(item.eventId)) {
      counts.set(item.userId, (counts.get(item.userId) ?? 0) + 1)
    }
  }
  return counts
}
