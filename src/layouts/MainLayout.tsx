import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-4 px-4 py-4">
        <Sidebar />
        <main className="min-w-0 flex-1 rounded-xl border border-ftu/30 bg-white p-5 shadow-md">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
