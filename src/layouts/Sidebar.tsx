import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getNavItems } from './navItems'

const ITEM = 'block border-b border-slate-200 px-3 py-3.5 text-[15px] transition'
const ACTIVE = 'border-b-2 border-b-ftu bg-ftu-soft font-semibold text-ftu'
const IDLE = 'text-slate-800 hover:bg-slate-50 hover:text-ftu'

/** Menu bên trái giống cổng thông tin sinh viên */
export default function Sidebar() {
  const { pathname } = useLocation()
  const { user } = useAuth()

  return (
    <aside className="hidden w-60 shrink-0 self-start rounded-xl bg-white p-2 shadow-sm md:block">
      <nav aria-label="Menu bên">
        {getNavItems(user).map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`${ITEM} ${item.match(pathname) ? ACTIVE : IDLE}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
