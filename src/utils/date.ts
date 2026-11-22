const WEEKDAYS = [
  'Chủ nhật',
  'Thứ hai',
  'Thứ ba',
  'Thứ tư',
  'Thứ năm',
  'Thứ sáu',
  'Thứ bảy',
]

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

/** Ngày hôm nay (giờ máy người dùng) dạng YYYY-MM-DD, so sánh được với giá trị của ô ngày */
export function getToday(): string {
  const now = new Date()
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

/** Đổi YYYY-MM-DD thành "Thứ bảy, 06/12/2026". Tách chuỗi thủ công để không bị lệch múi giờ */
export function formatDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number)
  if (!year || !month || !day) return date
  const weekday = WEEKDAYS[new Date(year, month - 1, day).getDay()]
  return `${weekday}, ${pad(day)}/${pad(month)}/${year}`
}
