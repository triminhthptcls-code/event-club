import Button from './Button'

interface PaginationProps {
  page: number
  pages: number
  onChange: (page: number) => void
}

export default function Pagination({ page, pages, onChange }: PaginationProps) {
  return (
    <nav
      className="mt-4 flex items-center justify-center gap-3"
      aria-label="Phân trang"
    >
      <Button
        variant="secondary"
        size="sm"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        ← Trước
      </Button>
      <span className="text-sm text-slate-600">
        Trang {page} / {pages}
      </span>
      <Button
        variant="secondary"
        size="sm"
        disabled={page >= pages}
        onClick={() => onChange(page + 1)}
      >
        Sau →
      </Button>
    </nav>
  )
}
