import type { EventMode } from '../types/event'
import { MODE_LABELS } from '../utils/constants'

interface ModeBadgeProps {
  mode: EventMode
}

export default function ModeBadge({ mode }: ModeBadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
        mode === 'online'
          ? 'bg-sky-100 text-sky-700'
          : 'bg-amber-100 text-amber-700'
      }`}
    >
      {MODE_LABELS[mode]}
    </span>
  )
}
