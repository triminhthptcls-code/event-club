import { useState } from 'react'
import { getClub, getGroupColor } from '../data/clubs'
import { assetUrl } from '../utils/assetUrl'

interface ClubIconProps {
  clubId: string
  /** Cạnh của icon (px) */
  size?: number
}

/**
 * Icon CLB: dùng logo khai báo trong src/data/clubs.ts (file nằm ở public/images/clubs),
 * nếu không tải được logo thì hiện ô màu theo nhóm với tên viết tắt.
 */
export default function ClubIcon({ clubId, size = 40 }: ClubIconProps) {
  const club = getClub(clubId)
  const [failed, setFailed] = useState(false)
  const style = { width: size, height: size }

  if (!club) {
    return (
      <span
        className="inline-flex shrink-0 items-center justify-center rounded-full bg-slate-300 text-xs font-bold text-white"
        style={style}
      >
        ?
      </span>
    )
  }

  if (!failed) {
    return (
      <img
        src={assetUrl(club.logo ?? `/images/clubs/${club.id}.png`)}
        alt=""
        style={style}
        className="shrink-0 rounded-full bg-white object-contain ring-1 ring-slate-200"
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 items-center justify-center rounded-full font-bold leading-none text-white"
      style={{
        ...style,
        backgroundColor: getGroupColor(club.group),
        fontSize: Math.max(8, Math.round(size / (club.short.length > 3 ? 4.2 : 3.2))),
      }}
    >
      {club.short}
    </span>
  )
}
