import { useState } from 'react'
import { CLUBS, CLUB_GROUPS } from '../data/clubs'
import ClubIcon from './ClubIcon'

interface ClubFilterProps {
  /** Các mã CLB đang chọn; mảng rỗng = tất cả */
  selected: string[]
  onChange: (selected: string[]) => void
}

/** Hàng icon CLB để lọc sự kiện, chọn được nhiều CLB cùng lúc */
export default function ClubFilter({ selected, onChange }: ClubFilterProps) {
  const [expanded, setExpanded] = useState(false)

  const toggle = (id: string) =>
    onChange(selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id])

  const renderButton = (id: string) => {
    const club = CLUBS.find((item) => item.id === id)
    if (!club) return null
    const active = selected.includes(id)
    return (
      <button
        key={id}
        type="button"
        title={club.name}
        aria-label={club.name}
        aria-pressed={active}
        onClick={() => toggle(id)}
        className={`flex w-16 flex-col items-center gap-1 rounded-lg border p-1.5 text-center transition ${
          active
            ? 'border-ftu bg-ftu-soft'
            : 'border-transparent hover:border-slate-300 hover:bg-slate-50'
        }`}
      >
        <ClubIcon clubId={id} size={40} />
        <span className="text-[11px] font-medium leading-tight text-slate-700">{club.short}</span>
      </button>
    )
  }

  return (
    <section aria-label="Lọc theo câu lạc bộ" className="mt-4 rounded-xl border border-slate-200 bg-white p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            aria-pressed={selected.length === 0}
            onClick={() => onChange([])}
            className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
              selected.length === 0
                ? 'border-ftu bg-ftu text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            Tất cả
          </button>
          {selected.length > 0 && (
            <span className="text-sm text-slate-500">Đã chọn {selected.length} đơn vị</span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="text-sm font-medium text-ftu hover:underline"
        >
          {expanded ? 'Thu gọn' : `Xem tất cả ${CLUBS.length} đơn vị`}
        </button>
      </div>

      {expanded ? (
        <div className="mt-3 space-y-3">
          {CLUB_GROUPS.map((group) => (
            <div key={group.id}>
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: group.color }}>
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-1">
                {CLUBS.filter((club) => club.group === group.id).map((club) => renderButton(club.id))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-3 flex gap-1 overflow-x-auto pb-1">
          {[...selected, ...CLUBS.filter((c) => !selected.includes(c.id)).map((c) => c.id)]
            .slice(0, Math.max(14, selected.length))
            .map(renderButton)}
        </div>
      )}
    </section>
  )
}
