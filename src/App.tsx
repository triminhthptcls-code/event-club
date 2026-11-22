import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthProvider from './auth/AuthProvider'
import RequireRole from './auth/RequireRole'
import ToastProvider from './components/toast/ToastProvider'
import MainLayout from './layouts/MainLayout'
import ClubsPage from './pages/ClubsPage'
import EventCreatePage from './pages/EventCreatePage'
import EventDetailPage from './pages/EventDetailPage'
import EventEditPage from './pages/EventEditPage'
import EventListPage from './pages/EventListPage'
import LoginPage from './pages/LoginPage'
import ManagePage from './pages/ManagePage'
import MyActivityPage from './pages/MyActivityPage'
import NewsPage from './pages/NewsPage'
import NotFoundPage from './pages/NotFoundPage'
import RegisterPage from './pages/RegisterPage'

export default function App() {
  return (
    <HashRouter>
      <ToastProvider>
        <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Navigate to="/su-kien" replace />} />
            <Route path="su-kien" element={<EventListPage />} />
            <Route
              path="su-kien/them"
              element={
                <RequireRole role="club">
                  <EventCreatePage />
                </RequireRole>
              }
            />
            <Route path="su-kien/:id" element={<EventDetailPage />} />
            <Route path="su-kien/:id/sua" element={<EventEditPage />} />
            <Route path="cau-lac-bo" element={<ClubsPage />} />
            <Route path="dang-nhap" element={<LoginPage />} />
            <Route path="dang-ky" element={<RegisterPage />} />
            <Route
              path="cua-toi"
              element={
                <RequireRole role="student">
                  <MyActivityPage />
                </RequireRole>
              }
            />
            <Route
              path="quan-ly"
              element={
                <RequireRole role="club">
                  <ManagePage />
                </RequireRole>
              }
            />
            <Route path="thong-bao" element={<NewsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        </AuthProvider>
      </ToastProvider>
    </HashRouter>
  )
}
