import { useEffect, useMemo, useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { CalendarIcon } from '../components/Icons'
import { getNews } from '../services/newsService'
import type { NewsItem } from '../types/news'
import { getErrorMessage } from '../utils/apiError'
import { formatDate } from '../utils/date'

const SOURCE_URL = 'https://qldt.ftu.edu.vn/'
const ALL = 'Tất cả'

type NewsState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; items: NewsItem[] }

export default function NewsPage() {
  const [state, setState] = useState<NewsState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)
  const [category, setCategory] = useState(ALL)

  useEffect(() => {
    let ignore = false
    setState({ status: 'loading' })
    getNews()
      .then((items) => {
        if (!ignore) setState({ status: 'success', items })
      })
      .catch((error: unknown) => {
        if (!ignore) setState({ status: 'error', message: getErrorMessage(error) })
      })
    return () => {
      ignore = true
    }
  }, [attempt])

  const categories = useMemo(() => {
    if (state.status !== 'success') return [ALL]
    return [ALL, ...Array.from(new Set(state.items.map((item) => item.category)))]
  }, [state])

  const visible =
    state.status === 'success'
      ? state.items.filter((item) => category === ALL || item.category === category)
      : []

  return (
    <>
      <h1 className="border-b border-slate-200 pb-3 text-2xl font-bold text-ftu">
        Thông báo của trường
      </h1>
      <p className="mt-3 text-sm text-slate-600">
        Thông báo từ Phòng Quản lý Đào tạo - Trường Đại học Ngoại thương. Bấm vào tiêu đề
        để mở bài gốc trên{' '}
        <a
          href={SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-ftu hover:underline"
        >
          qldt.ftu.edu.vn
        </a>
        .
      </p>

      {state.status === 'loading' && <Loading />}
      {state.status === 'error' && (
        <ErrorMessage
          message={state.message}
          onRetry={() => setAttempt((value) => value + 1)}
        />
      )}

      {state.status === 'success' && (
        <>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Lọc theo chuyên mục">
            {categories.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setCategory(name)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  category === name
                    ? 'border-ftu bg-ftu text-white'
                    : 'border-ftu/40 bg-white text-ftu hover:bg-ftu-soft'
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          <ul className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200">
            {visible.map((item) => (
              <li key={item.id} className="border-l-4 border-l-ftu p-4 hover:bg-slate-50">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <CalendarIcon className="h-3.5 w-3.5 text-ftu" />
                    {formatDate(item.date)}
                  </span>
                  <span className="rounded-full bg-ftu-soft px-2.5 py-0.5 font-medium text-ftu">
                    {item.category}
                  </span>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 block font-semibold leading-snug text-slate-900 hover:text-ftu"
                >
                  {item.title}
                </a>
              </li>
            ))}
            {visible.length === 0 && (
              <li className="p-6 text-center text-sm text-slate-500">
                Chưa có thông báo nào trong chuyên mục này.
              </li>
            )}
          </ul>
        </>
      )}
    </>
  )
}
