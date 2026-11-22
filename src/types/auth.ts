export type Role = 'student' | 'club'

/** Người dùng đang đăng nhập (không chứa mật khẩu) */
export interface User {
  id: string
  role: Role
  username: string
  fullName: string
  /** Mã sinh viên - chỉ có với role = 'student' */
  studentId?: string
  /** Gmail - chỉ có với role = 'student' */
  email?: string
  /** Mã CLB đang quản lý - chỉ có với role = 'club' */
  clubId?: string
}

/** Bản ghi người dùng trong db.json */
export interface UserRecord extends User {
  passwordHash: string
}

export interface RegisterInput {
  fullName: string
  studentId: string
  email: string
  username: string
  password: string
}

/** Sinh viên đăng ký một sự kiện */
export interface Registration {
  id: string
  eventId: string
  userId: string
  fullName: string
  studentId: string
  email: string
  createdAt: string
}

/** Sinh viên tham gia một CLB */
export interface Membership {
  id: string
  clubId: string
  userId: string
  fullName: string
  studentId: string
  email: string
  createdAt: string
}
