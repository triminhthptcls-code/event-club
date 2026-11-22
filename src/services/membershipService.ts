import type { Membership, User } from '../types/auth'
import { AppError } from '../utils/apiError'
import { http } from './http'

const RESOURCE = '/memberships'

export async function getAllMemberships(): Promise<Membership[]> {
  const response = await http.get<Membership[]>(RESOURCE)
  return response.data
}

export async function getMembershipsByClub(clubId: string): Promise<Membership[]> {
  const response = await http.get<Membership[]>(RESOURCE, {
    params: { clubId, _sort: 'fullName' },
  })
  return response.data
}

export async function getMembershipsByUser(userId: string): Promise<Membership[]> {
  const response = await http.get<Membership[]>(RESOURCE, { params: { userId } })
  return response.data
}

export async function joinClub(clubId: string, user: User): Promise<Membership> {
  if (user.role !== 'student') {
    throw new AppError('Chỉ tài khoản sinh viên mới tham gia được CLB.')
  }
  const existing = await getMembershipsByUser(user.id)
  if (existing.some((item) => item.clubId === clubId)) {
    throw new AppError('Bạn đã là thành viên của CLB này.')
  }
  const response = await http.post<Membership>(RESOURCE, {
    clubId,
    userId: user.id,
    fullName: user.fullName,
    studentId: user.studentId ?? '',
    email: user.email ?? '',
    createdAt: new Date().toISOString(),
  })
  return response.data
}

export async function leaveClub(id: string): Promise<void> {
  await http.delete(`${RESOURCE}/${id}`)
}
