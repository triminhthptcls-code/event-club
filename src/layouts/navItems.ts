import type { User } from '../types/auth'

export interface NavItem {
  to: string
  label: string
  /** Quyết định mục có sáng hay không theo đường dẫn hiện tại */
  match: (pathname: string) => boolean
}

const eventsActive = (pathname: string) =>
  pathname === '/su-kien' ||
  (pathname.startsWith('/su-kien/') && pathname !== '/su-kien/them')

/** Các mục menu theo vai trò: khách, sinh viên hoặc CLB */
export function getNavItems(user: User | null): NavItem[] {
  const items: NavItem[] = [
    { to: '/su-kien', label: 'Danh sách sự kiện', match: eventsActive },
    { to: '/cau-lac-bo', label: 'Câu lạc bộ', match: (p) => p === '/cau-lac-bo' },
  ]
  if (user?.role === 'student') {
    items.push({ to: '/cua-toi', label: 'Hoạt động của tôi', match: (p) => p === '/cua-toi' })
  }
  if (user?.role === 'club') {
    items.push(
      { to: '/su-kien/them', label: 'Thêm sự kiện', match: (p) => p === '/su-kien/them' },
      { to: '/quan-ly', label: 'Quản lý CLB', match: (p) => p === '/quan-ly' },
    )
  }
  items.push({ to: '/thong-bao', label: 'Thông báo của trường', match: (p) => p === '/thong-bao' })
  return items
}
