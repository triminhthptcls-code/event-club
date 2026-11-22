interface TextFieldProps {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  type?: 'text' | 'date' | 'time' | 'number' | 'url' | 'search' | 'password'
  error?: string
  required?: boolean
  placeholder?: string
  disabled?: boolean
  min?: number
  max?: number
  step?: number
  hint?: string
}

/** Ô nhập dùng lại: nhãn + input + thông báo lỗi ngay bên dưới */
export default function TextField({
  label,
  name,
  value,
  onChange,
  onBlur,
  type = 'text',
  error,
  required = false,
  placeholder,
  disabled = false,
  min,
  max,
  step,
  hint,
}: TextFieldProps) {
  const id = `field-${name}`
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  const describedBy = [error ? errorId : null, hint ? hintId : null]
    .filter(Boolean)
    .join(' ')

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-rose-600">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        inputMode={type === 'number' ? 'numeric' : undefined}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 shadow-xs outline-none transition placeholder:text-slate-400 focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 ${
          error
            ? 'border-rose-500 bg-rose-50 focus:border-rose-500 focus:ring-rose-200'
            : 'border-slate-300 focus:border-ftu focus:ring-red-200'
        }`}
      />
      {hint && !error && (
        <p id={hintId} className="mt-1 text-xs text-slate-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-rose-600">
          {error}
        </p>
      )}
    </div>
  )
}
