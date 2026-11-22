import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import TextField from '../components/TextField'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { getErrorMessage } from '../utils/apiError'

export default function LoginPage() {
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/su-kien'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    if (!username.trim() || !password) return
    setLoading(true)
    setError(null)
    try {
      const user = await login(username, password)
      showToast(`Xin chào ${user.fullName}!`)
      navigate(from, { replace: true })
    } catch (err: unknown) {
      setError(getErrorMessage(err))
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold text-slate-900">Đăng nhập</h1>
      <p className="mt-1 text-sm text-slate-600">
        Sinh viên đăng nhập để đăng ký sự kiện và tham gia CLB. Tài khoản CLB dùng để đăng và
        quản lý sự kiện.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-5 space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-xs"
      >
        <TextField
          name="username"
          label="Tên đăng nhập"
          required
          value={username}
          onChange={setUsername}
          onBlur={() => undefined}
          disabled={loading}
          error={submitted && !username.trim() ? 'Vui lòng nhập tên đăng nhập.' : undefined}
        />
        <TextField
          name="password"
          type="password"
          label="Mật khẩu"
          required
          value={password}
          onChange={setPassword}
          onBlur={() => undefined}
          disabled={loading}
          error={submitted && !password ? 'Vui lòng nhập mật khẩu.' : undefined}
        />
        {error && (
          <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        )}
        <Button type="submit" loading={loading} loadingText="Đang đăng nhập..." className="w-full">
          Đăng nhập
        </Button>
        <p className="text-center text-sm text-slate-600">
          Chưa có tài khoản sinh viên?{' '}
          <Link to="/dang-ky" className="font-medium text-ftu hover:underline">
            Đăng ký
          </Link>
        </p>
      </form>

      <details className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <summary className="cursor-pointer font-medium text-slate-700">Tài khoản dùng thử</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Sinh viên: <code>sv01</code> … <code>sv20</code>, mật khẩu <code>sv123456</code></li>
          <li>CLB: tên đăng nhập là mã CLB (ví dụ <code>ibc</code>, <code>mac</code>, <code>qec</code>), mật khẩu <code>club123</code></li>
        </ul>
      </details>
    </div>
  )
}
