export type ButtonVariant = 'primary' | 'secondary' | 'danger'
export type ButtonSize = 'md' | 'sm'

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-ftu text-white hover:bg-ftu-dark focus-visible:ring-ftu',
  secondary:
    'border border-ftu bg-white text-ftu hover:bg-ftu-soft focus-visible:ring-ftu',
  danger: 'bg-slate-700 text-white hover:bg-slate-800 focus-visible:ring-slate-500',
}

const SIZES: Record<ButtonSize, string> = {
  md: 'px-4 py-2 text-sm',
  sm: 'px-3 py-1.5 text-xs',
}

/** Class Tailwind dùng chung cho nút và cho thẻ Link trông như nút */
export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
): string {
  return `${BASE} ${VARIANTS[variant]} ${SIZES[size]}`
}
