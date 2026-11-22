import { Link } from 'react-router-dom'
import { buttonClasses } from '../utils/ui'

interface NotFoundMessageProps {
  title: string
  message: string
}

export default function NotFoundMessage({ title, message }: NotFoundMessageProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-12 text-center shadow-xs">
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      <p className="mx-auto mt-2 max-w-md text-slate-600">{message}</p>
      <Link to="/su-kien" className={`${buttonClasses('primary')} mt-6`}>
        Về danh sách sự kiện
      </Link>
    </div>
  )
}
