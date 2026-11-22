import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { fileToCompressedDataUrl } from '../utils/image'
import { buttonClasses } from '../utils/ui'

interface ImageFieldProps {
  value: string
  error?: string
  disabled?: boolean
  onChange: (value: string) => void
  onBlur: () => void
}

/** Ô chọn ảnh bìa: chọn file từ máy (tự nén) hoặc dán đường dẫn ảnh */
export default function ImageField({
  value,
  error,
  disabled = false,
  onChange,
  onBlur,
}: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [fileError, setFileError] = useState<string | null>(null)
  const [failedSrc, setFailedSrc] = useState('')

  const isDataUrl = value.startsWith('data:')
  const previewFailed = failedSrc === value
  const shownError = fileError ?? error

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    setFileError(null)
    setBusy(true)
    try {
      onChange(await fileToCompressedDataUrl(file))
    } catch (err: unknown) {
      setFileError(err instanceof Error ? err.message : 'Không đọc được ảnh.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <span className="mb-1 block text-sm font-medium text-slate-700">
        Ảnh bìa <span className="font-normal text-slate-500">(không bắt buộc)</span>
      </span>

      {value && (
        <div className="mb-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
          {previewFailed ? (
            <p className="px-4 py-10 text-center text-sm text-slate-500">
              Không tải được ảnh xem trước. Hãy kiểm tra lại đường dẫn.
            </p>
          ) : (
            <img
              src={value}
              alt="Xem trước ảnh bìa"
              onError={() => setFailedSrc(value)}
              className="h-48 w-full object-cover"
            />
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
          disabled={disabled || busy}
        />
        <button
          type="button"
          id="field-image"
          className={buttonClasses('secondary', 'sm')}
          disabled={disabled || busy}
          onClick={() => inputRef.current?.click()}
        >
          {busy ? 'Đang xử lý ảnh...' : value ? 'Đổi ảnh' : 'Chọn ảnh từ máy'}
        </button>
        {value && (
          <button
            type="button"
            className={buttonClasses('secondary', 'sm')}
            disabled={disabled || busy}
            onClick={() => {
              setFileError(null)
              onChange('')
            }}
          >
            Xóa ảnh
          </button>
        )}
      </div>

      <input
        type="url"
        value={isDataUrl ? '' : value}
        disabled={disabled || busy}
        placeholder={
          isDataUrl ? 'Đang dùng ảnh đã chọn từ máy' : 'Hoặc dán đường dẫn ảnh: https://...'
        }
        onChange={(event) => {
          setFileError(null)
          onChange(event.target.value)
        }}
        onBlur={onBlur}
        className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-ftu focus:ring-2 focus:ring-red-200 disabled:bg-slate-100"
      />

      {shownError ? (
        <p role="alert" className="mt-1 text-sm text-rose-600">
          {shownError}
        </p>
      ) : (
        <p className="mt-1 text-xs text-slate-500">
          Ảnh chọn từ máy được tự thu nhỏ và nén. Nếu bỏ trống, sự kiện dùng ảnh mặc định.
        </p>
      )}
    </div>
  )
}
