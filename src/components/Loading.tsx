interface LoadingProps {
  text?: string
}

export default function Loading({ text = 'Đang tải dữ liệu...' }: LoadingProps) {
  return (
    <div
      role="status"
      className="flex items-center justify-center gap-3 py-12 text-slate-500"
    >
      <span
        className="h-6 w-6 animate-spin rounded-full border-4 border-red-200 border-t-ftu"
        aria-hidden="true"
      />
      <span className="text-sm">{text}</span>
    </div>
  )
}
