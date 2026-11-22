import { getClub } from '../data/clubs'
import ClubIcon from './ClubIcon'

/** Nhãn nhỏ "icon + tên viết tắt CLB" dùng trên card và trang chi tiết */
export default function ClubBadge({ clubId }: { clubId: string }) {
  const club = getClub(clubId)
  if (!club) return null
  return (
    <span
      title={club.name}
      className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 py-0.5 pl-0.5 pr-2.5 text-xs font-medium text-slate-700"
    >
      <ClubIcon clubId={clubId} size={20} />
      {club.short}
    </span>
  )
}
