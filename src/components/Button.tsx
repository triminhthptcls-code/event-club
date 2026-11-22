import type { ButtonHTMLAttributes } from 'react'
import { buttonClasses } from '../utils/ui'
import type { ButtonSize, ButtonVariant } from '../utils/ui'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Khi true: khóa nút và hiện loadingText thay cho nội dung */
  loading?: boolean
  loadingText?: string
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingText = 'Đang xử lý...',
  disabled,
  type = 'button',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${buttonClasses(variant, size)} ${className}`}
      {...rest}
    >
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {loading ? loadingText : children}
    </button>
  )
}
