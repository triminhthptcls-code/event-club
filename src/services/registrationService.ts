import type { ClubEvent } from '../types/event'
import type { Registration, User } from '../types/auth'
import { AppError } from '../utils/apiError'
import { getToday } from '../utils/date'
import { http } from './http'

const RESOURCE = '/registrations'

export async function getAllRegistrations(): Promise<Registration[]> {
  const response = await http.get<Registration[]>(RESOURCE)
  return response.data
}

export async function getRegistrationsByEvent(eventId: string): Promise<Registration[]> {
  const response = await http.get<Registration[]>(RESOURCE, {
    params: { eventId, _sort: 'createdAt' },
  })
  return response.data
}

export async function getRegistrationsByUser(userId: string): Promise<Registration[]> {
  const response = await http.get<Registration[]>(RESOURCE, { params: { userId } })
  return response.data
}

/** Đăng ký sự kiện: kiểm tra ngày, trùng đăng ký và số chỗ ngay trước khi ghi */
export async function registerForEvent(event: ClubEvent, user: User): Promise<Registration> {
  if (user.role !== 'student') {
    throw new AppError('Chỉ tài khoản sinh viên mới đăng ký được sự kiện.')
  }
  if (event.date < getToday()) {
    throw new AppError('Sự kiện này đã diễn ra, không thể đăng ký.')
  }
  const current = await getRegistrationsByEvent(event.id)
  if (current.some((item) => item.userId === user.id)) {
    throw new AppError('Bạn đã đăng ký sự kiện này rồi.')
  }
  if (current.length >= event.maxSeats) {
    throw new AppError('Sự kiện đã hết chỗ.')
  }
  const response = await http.post<Registration>(RESOURCE, {
    eventId: event.id,
    userId: user.id,
    fullName: user.fullName,
    studentId: user.studentId ?? '',
    email: user.email ?? '',
    createdAt: new Date().toISOString(),
  })
  return response.data
}

export async function cancelRegistration(id: string): Promise<void> {
  await http.delete(`${RESOURCE}/${id}`)
}
