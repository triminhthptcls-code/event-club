import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import ClubIcon from '../components/ClubIcon'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { CLUB_GROUPS, JOINABLE_CLUBS } from '../data/clubs'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { getAllMemberships, joinClub, leaveClub } from '../services/membershipService'
import type { Membership } from '../types/auth'
import { getErrorMessage } from '../utils/apiError'
import { buttonClasses } from '../utils/ui'

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; memberships: Membership[] }

/** Danh sách CLB theo nhóm; sinh viên bấm để tham gia / rời CLB */
export default function ClubsPage() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [state, setState] = useState<State>({ status: 'loading' })
  const [busy, setBusy] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  const load = useCallback(() => setAttempt((value) => value + 1), [])

  useEffect(() => {
    let ignore = false
    getAllMemberships()
      .then((memberships) => {
        if (!ignore) setState({ status: 'success', memberships })
      })
      .catch((error: unknown) => {
        if (!ignore) setState({ status: 'error', message: getErrorMessage(error) })
      })
    return () => {
      ignore = true
    }
  }, [attempt])

  if (state.status === 'loading') return <Loading />
  if (state.status === 'error') return <ErrorMessage message={state.message} onRetry={load} />

  const { memberships } = state
  const mine = (clubId: string) =>
    memberships.find((item) => item.clubId === clubId && item.userId === user?.id)

  const toggle = async (clubId: string) => {
    if (!user || busy) return
    setBusy(clubId)
    try {
      const existing = mine(clubId)
      if (existing) {
        await leaveClub(existing.id)
        showToast('Đã rời câu lạc bộ.')
      } else {
        await joinClub(clubId, user)
        showToast('Đã tham gia câu lạc bộ.')
      }
      load()
    } catch (error: unknown) {
      showToast(getErrorMessage(error), 'error')
    } finally {
      setBusy(null)
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-ftu">Câu lạc bộ</h1>
      <p className="mt-1 text-sm text-slate-600">
        {user?.role === 'student'
          ? 'Bấm "Tham gia" để trở thành thành viên của CLB.'
          : user?.role === 'club'
            ? 'Tài khoản CLB không tham gia CLB khác.'
            : 'Đăng nhập bằng tài khoản sinh viên để tham gia CLB.'}
      </p>

      {CLUB_GROUPS.filter((group) => group.id !== 'school').map((group) => (
        <section key={group.id} className="mt-6">
          <h2 className="mb-3 border-l-4 px-3 py-1 text-sm font-semibold uppercase tracking-wide" style={{ borderColor: group.color, color: group.color }}>
            {group.label}
          </h2>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {JOINABLE_CLUBS.filter((club) => club.group === group.id).map((club) => {
              const joined = mine(club.id)
              const count = memberships.filter((item) => item.clubId === club.id).length
              return (
                <article key={club.id} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                  <ClubIcon clubId={club.id} size={48} />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold leading-snug text-slate-900">{club.name}</h3>
                    <p className="text-xs text-slate-500">{count} thành viên</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Link to={`/su-kien?club=${club.id}`} className={buttonClasses('secondary', 'sm')}>
                        Sự kiện
                      </Link>
                      {user?.role === 'student' && (
                        <Button
                          size="sm"
                          variant={joined ? 'danger' : 'primary'}
                          loading={busy === club.id}
                          loadingText="Đang xử lý..."
                          onClick={() => toggle(club.id)}
                        >
                          {joined ? 'Rời CLB' : 'Tham gia'}
                        </Button>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      ))}

      {!user && (
        <p className="mt-6 text-sm">
          <Link to="/dang-nhap" className="font-medium text-ftu hover:underline">Đăng nhập</Link> để tham gia CLB.
        </p>
      )}
    </>
  )
}
