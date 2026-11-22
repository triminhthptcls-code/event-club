interface SeatBadgeProps {
  registered: number
  maxSeats: number
}

/** Nhãn số chỗ còn lại: xanh = còn nhiều, vàng = sắp hết, xám = hết chỗ */
export default function SeatBadge({ registered, maxSeats }: SeatBadgeProps) {
  const left = Math.max(0, maxSeats - registered)
  const style =
    left === 0
      ? 'bg-slate-200 text-slate-600'
      : left <= Math.max(3, Math.ceil(maxSeats * 0.15))
        ? 'bg-amber-100 text-amber-700'
        : 'bg-emerald-100 text-emerald-700'
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}>
      {left === 0 ? 'Hết chỗ' : `Còn ${left}/${maxSeats} chỗ`}
    </span>
  )
}
