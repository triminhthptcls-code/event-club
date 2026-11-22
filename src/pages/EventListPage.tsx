import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ClubFilter from '../components/ClubFilter'
import ConfirmDialog from '../components/ConfirmDialog'
import EventSection from '../components/EventSection'
import TextField from '../components/TextField'
import { useDebounce } from '../hooks/useDebounce'
import { useDeleteEvent } from '../hooks/useDeleteEvent'
import { useAuth } from '../hooks/useAuth'
import { PlusIcon } from '../components/Icons'
import { buttonClasses } from '../utils/ui'

export default function EventListPage() {
  const [searchInput, setSearchInput] = useState('')
  const search = useDebounce(searchInput, 400)
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  // /su-kien?club=ibc mở sẵn bộ lọc theo CLB (dùng từ trang Câu lạc bộ)
  const [clubs, setClubs] = useState<string[]>(() => searchParams.getAll('club'))
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const remove = useDeleteEvent(() => setRefreshKey((value) => value + 1))

  return (
    <>
      {/* Banner phủ kín chiều ngang khung nội dung */}
      <img
        src="/images/ftu-banner-main.jpg"
        alt="Banner Trường Đại học Ngoại thương"
        className="w-full rounded-xl object-cover shadow-md"
      />

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-ftu">Sự kiện câu lạc bộ</h1>
        {user?.role === 'club' && (
          <Link to="/su-kien/them" className={buttonClasses('primary')}>
            <PlusIcon className="h-4 w-4" />
            Thêm sự kiện
          </Link>
        )}
      </div>

      <div className="mt-4 max-w-md">
        <TextField
          name="search"
          type="search"
          label="Tìm kiếm theo tên sự kiện"
          placeholder="Nhập tên sự kiện..."
          value={searchInput}
          onChange={setSearchInput}
          onBlur={() => undefined}
        />
      </div>

      <label className="mt-4 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
        <input
          type="checkbox"
          checked={onlyAvailable}
          onChange={(event) => setOnlyAvailable(event.target.checked)}
          className="h-4 w-4 accent-[#b01820]"
        />
        Chỉ hiện sự kiện còn chỗ
      </label>

      <ClubFilter selected={clubs} onChange={setClubs} />

      {/* key theo từ khóa: đổi từ khóa thì mỗi nhóm quay về trang 1 */}
      <EventSection
        key={`upcoming-${search}-${clubs.join(',')}-${onlyAvailable}`}
        title="Sắp diễn ra"
        status="upcoming"
        search={search}
        clubs={clubs}
        onlyAvailable={onlyAvailable}
        refreshKey={refreshKey}
        onDelete={remove.request}
      />
      <EventSection
        key={`past-${search}-${clubs.join(',')}-${onlyAvailable}`}
        title="Đã diễn ra"
        status="past"
        search={search}
        clubs={clubs}
        onlyAvailable={onlyAvailable}
        refreshKey={refreshKey}
        onDelete={remove.request}
      />

      {remove.target && (
        <ConfirmDialog
          title="Xóa sự kiện"
          message={
            <>
              Bạn có chắc muốn xóa sự kiện <strong>"{remove.target.name}"</strong>? Hành
              động này không thể hoàn tác.
            </>
          }
          confirmLabel="Xóa"
          loading={remove.deleting}
          onConfirm={remove.confirm}
          onCancel={remove.cancel}
        />
      )}
    </>
  )
}
