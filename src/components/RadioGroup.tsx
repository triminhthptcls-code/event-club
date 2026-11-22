interface RadioOption<T extends string> {
  value: T
  label: string
}

interface RadioGroupProps<T extends string> {
  legend: string
  name: string
  value: T
  options: RadioOption<T>[]
  onChange: (value: T) => void
  disabled?: boolean
}

/** Nhóm nút chọn dạng segmented (dùng cho "Hình thức") */
export default function RadioGroup<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
  disabled = false,
}: RadioGroupProps<T>) {
  return (
    <fieldset>
      <legend className="mb-1 block text-sm font-medium text-slate-700">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = option.value === value
          return (
            <label
              key={option.value}
              className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition focus-within:ring-2 focus-within:ring-red-300 ${
                checked
                  ? 'border-ftu bg-ftu text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
              } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                disabled={disabled}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
