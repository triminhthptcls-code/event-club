import type {
  ClubEvent,
  EventPayload,
  EventQuery,
  EventWithSeats,
  PagedResult,
} from '../types/event'
import { getToday } from '../utils/date'
import { http } from './http'
import { getAllRegistrations, getRegistrationsByEvent } from './registrationService'

const RESOURCE = '/events'

/** Gắn số người đã đăng ký vào từng sự kiện (đếm từ bảng registrations) */
async function withSeats(events: ClubEvent[]): Promise<EventWithSeats[]> {
  const registrations = await getAllRegistrations()
  const counts = new Map<string, number>()
  for (const item of registrations) {
    counts.set(item.eventId, (counts.get(item.eventId) ?? 0) + 1)
  }
  return events.map((event) => ({ ...event, registered: counts.get(event.id) ?? 0 }))
}

/**
 * Danh sách theo nhóm, có tìm kiếm, lọc CLB, lọc còn chỗ và phân trang:
 * - upcoming: date >= hôm nay, sắp xếp tăng dần (sự kiện gần nhất lên đầu)
 * - past: date < hôm nay, sắp xếp giảm dần (sự kiện mới diễn ra lên đầu)
 *
 * json-server 1.0.0-beta.3 chỉ lọc bằng "=" và không có contains / so sánh ngày
 * dạng chuỗi / lọc nhiều CLB, nên API chỉ lọc theo CLB (club=<id>, một lần gọi cho
 * mỗi CLB đã chọn); phần còn lại được lọc, sắp xếp và phân trang ở client.
 */
export async function getEvents(
  query: EventQuery,
): Promise<PagedResult<EventWithSeats>> {
  const clubParams = query.clubs.length > 0 ? query.clubs : [null]
  const responses = await Promise.all(
    clubParams.map((club) =>
      http.get<ClubEvent[]>(RESOURCE, { params: club ? { club } : {} }),
    ),
  )
  const today = getToday()
  const keyword = query.search.trim().toLowerCase()

  const events = (await withSeats(responses.flatMap((response) => response.data))).filter(
    (event) => {
      if (query.status === 'upcoming' ? event.date < today : event.date >= today) return false
      if (keyword && !event.name.toLowerCase().includes(keyword)) return false
      if (query.onlyAvailable && event.registered >= event.maxSeats) return false
      return true
    },
  )

  const direction = query.status === 'upcoming' ? 1 : -1
  events.sort(
    (a, b) =>
      direction *
      (a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime)),
  )

  const total = events.length
  const pages = Math.ceil(total / query.perPage)
  const start = (query.page - 1) * query.perPage
  return { items: events.slice(start, start + query.perPage), total, pages }
}

/** Toàn bộ sự kiện của một CLB (kèm số đăng ký), mới nhất trước */
export async function getEventsByClub(clubId: string): Promise<EventWithSeats[]> {
  const response = await http.get<ClubEvent[]>(RESOURCE, {
    params: { club: clubId, _sort: '-date,-startTime' },
  })
  return withSeats(response.data)
}

/** Lấy nhiều sự kiện theo id; id nào không còn tồn tại thì bỏ qua */
export async function getEventsByIds(ids: string[]): Promise<ClubEvent[]> {
  const results = await Promise.all(
    ids.map((id) => getEventById(id).catch(() => null)),
  )
  return results.filter((event): event is ClubEvent => event !== null)
}

/** GET một sự kiện theo id */
export async function getEventById(id: string): Promise<ClubEvent> {
  const response = await http.get<ClubEvent>(`${RESOURCE}/${id}`)
  return response.data
}

/** POST thêm mới */
export async function createEvent(payload: EventPayload): Promise<ClubEvent> {
  const response = await http.post<ClubEvent>(RESOURCE, payload)
  return response.data
}

/** PUT cập nhật toàn bộ sự kiện */
export async function updateEvent(
  id: string,
  payload: EventPayload,
): Promise<ClubEvent> {
  const response = await http.put<ClubEvent>(`${RESOURCE}/${id}`, {
    ...payload,
    id,
  })
  return response.data
}

/** DELETE xóa sự kiện */
export async function deleteEvent(id: string): Promise<void> {
  // Xóa luôn các lượt đăng ký của sự kiện để không còn dữ liệu mồ côi
  const registrations = await getRegistrationsByEvent(id)
  await Promise.all(registrations.map((item) => http.delete(`/registrations/${item.id}`)))
  await http.delete(`${RESOURCE}/${id}`)
}
