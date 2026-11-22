import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getClub } from '../data/clubs'
import { useAuth } from '../hooks/useAuth'
import { getNavItems } from './navItems'
import { assetUrl } from '../utils/assetUrl'

const BASE_PILL =
  'inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition'
const ACTIVE_PILL = 'bg-white text-ftu'
const IDLE_PILL = 'bg-black/20 text-white hover:bg-black/30'

export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const displayName =
    user?.role === 'club' ? (getClub(user.clubId ?? '')?.short ?? user.fullName) : user?.fullName

  return (
    <header className="sticky top-0 z-30 bg-ftu shadow-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-2.5">
        <Link to="/su-kien" className="flex items-center gap-2 text-white">
          <img
            src={assetUrl('/images/ftu-logo.png')}
            alt="Logo Đại học Ngoại thương"
            className="h-10 w-10 rounded-full bg-white"
          />
          <span className="leading-tight">
            <span className="block text-base font-bold">FTU Club Events</span>
            <span className="block text-[11px] font-medium text-red-100">
              Đại học Ngoại thương
            </span>
          </span>
        </Link>
        <nav className="flex flex-wrap gap-2 sm:ml-4" aria-label="Menu chính">
          {getNavItems(user).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`${BASE_PILL} ${item.match(pathname) ? ACTIVE_PILL : IDLE_PILL}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 text-xs text-white">
          {user ? (
            <>
              <span className="text-right leading-tight">
                <span className="block font-semibold">{displayName}</span>
                <span className="block text-[11px] text-red-100">
                  {user.role === 'club' ? 'Tài khoản CLB' : 'Sinh viên'}
                </span>
              </span>
              <button
                type="button"
                onClick={() => {
                  logout()
                  navigate('/su-kien')
                }}
                className={`${BASE_PILL} ${IDLE_PILL}`}
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link to="/dang-nhap" className={`${BASE_PILL} ${pathname === '/dang-nhap' ? ACTIVE_PILL : IDLE_PILL}`}>
                Đăng nhập
              </Link>
              <Link to="/dang-ky" className={`${BASE_PILL} ${pathname === '/dang-ky' ? ACTIVE_PILL : IDLE_PILL}`}>
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
