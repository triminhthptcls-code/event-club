import type { RegisterInput, User, UserRecord } from '../types/auth'
import { AppError } from '../utils/apiError'
import { http } from './http'

const RESOURCE = '/users'
const SALT = 'ftu-club-events'

/**
 * Băm mật khẩu bằng SHA-256 (trình duyệt) trước khi so sánh/lưu.
 * Lưu ý: đây chỉ là mức bảo vệ cho bản demo dùng json-server; một hệ thống thật
 * phải xác thực ở máy chủ với thuật toán băm chậm (bcrypt/argon2) và token/phiên.
 */
async function hashPassword(username: string, password: string): Promise<string> {
  const data = new TextEncoder().encode(`${SALT}:${username}:${password}`)
  const buffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

function toUser(record: UserRecord): User {
  const { passwordHash: _passwordHash, ...user } = record
  void _passwordHash
  return user
}

export async function login(username: string, password: string): Promise<User> {
  const name = username.trim().toLowerCase()
  const response = await http.get<UserRecord[]>(RESOURCE, { params: { username: name } })
  const record = response.data[0]
  const hash = await hashPassword(name, password)
  if (!record || record.passwordHash !== hash) {
    throw new AppError('Tên đăng nhập hoặc mật khẩu không đúng.')
  }
  return toUser(record)
}

export async function registerStudent(input: RegisterInput): Promise<User> {
  const username = input.username.trim().toLowerCase()
  const studentId = input.studentId.trim()
  const email = input.email.trim().toLowerCase()

  const [sameName, sameId] = await Promise.all([
    http.get<UserRecord[]>(RESOURCE, { params: { username } }),
    http.get<UserRecord[]>(RESOURCE, { params: { studentId } }),
  ])
  if (sameName.data.length > 0) {
    throw new AppError('Tên đăng nhập đã được sử dụng, hãy chọn tên khác.')
  }
  if (sameId.data.length > 0) {
    throw new AppError('Mã sinh viên này đã có tài khoản.')
  }

  const record: Omit<UserRecord, 'id'> = {
    role: 'student',
    username,
    passwordHash: await hashPassword(username, input.password),
    fullName: input.fullName.trim(),
    studentId,
    email,
  }
  const response = await http.post<UserRecord>(RESOURCE, record)
  return toUser(response.data)
}
