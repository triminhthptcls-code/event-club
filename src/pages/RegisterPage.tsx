import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import TextField from '../components/TextField'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { getErrorMessage } from '../utils/apiError'

interface Values {
  fullName: string
  studentId: string
  email: string
  username: string
  password: string
  confirm: string
}

type Errors = Partial<Record<keyof Values, string>>

function validate(values: Values): Errors {
  const errors: Errors = {}
  if (values.fullName.trim().length < 2) errors.fullName = 'Vui lòng nhập họ và tên.'
  if (!/^\d{6,12}$/.test(values.studentId.trim())) {
    errors.studentId = 'Mã sinh viên gồm 6 đến 12 chữ số.'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Email không đúng định dạng, ví dụ: ten@gmail.com.'
  }
  if (!/^[a-z0-9_.]{3,20}$/i.test(values.username.trim())) {
    errors.username = 'Tên đăng nhập 3-20 ký tự, chỉ gồm chữ, số, dấu _ hoặc dấu chấm.'
  }
  if (values.password.length < 6) errors.password = 'Mật khẩu phải có ít nhất 6 ký tự.'
  if (values.confirm !== values.password) errors.confirm = 'Mật khẩu nhập lại không khớp.'
  return errors
}

export default function RegisterPage() {
  const { register } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [values, setValues] = useState<Values>({
    fullName: '',
    studentId: '',
    email: '',
    username: '',
    password: '',
    confirm: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const errors = validate(values)
  const field = (name: keyof Values) => ({
    name,
    value: values[name],
    error: submitted ? errors[name] : undefined,
    disabled: loading,
    onChange: (value: string) => setValues((current) => ({ ...current, [name]: value })),
    onBlur: () => undefined,
  })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length > 0) return
    setLoading(true)
    setError(null)
    try {
      await register({
        fullName: values.fullName,
        studentId: values.studentId,
        email: values.email,
        username: values.username,
        password: values.password,
      })
      showToast('Đăng ký tài khoản thành công.')
      navigate('/su-kien', { replace: true })
    } catch (err: unknown) {
      setError(getErrorMessage(err))
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold text-slate-900">Đăng ký tài khoản sinh viên</h1>
      <p className="mt-1 text-sm text-slate-600">
        Tài khoản CLB do ban quản trị cấp, không đăng ký tại đây.
      </p>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-5 space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-xs"
      >
        <TextField {...field('fullName')} label="Họ và tên" required placeholder="Nguyễn Văn A" />
        <TextField {...field('studentId')} label="Mã sinh viên" required placeholder="2411xxxxx" />
        <TextField {...field('email')} type="text" label="Gmail" required placeholder="ten@gmail.com" />
        <TextField {...field('username')} label="Tên đăng nhập" required />
        <TextField {...field('password')} type="password" label="Mật khẩu" required hint="Ít nhất 6 ký tự." />
        <TextField {...field('confirm')} type="password" label="Nhập lại mật khẩu" required />
        {error && (
          <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        )}
        <Button type="submit" loading={loading} loadingText="Đang tạo tài khoản..." className="w-full">
          Đăng ký
        </Button>
        <p className="text-center text-sm text-slate-600">
          Đã có tài khoản?{' '}
          <Link to="/dang-nhap" className="font-medium text-ftu hover:underline">
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  )
}
