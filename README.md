# CLB Events - Quản lý sự kiện câu lạc bộ

Bài tập lớn: ứng dụng CRUD với React. Quản lý sự kiện câu lạc bộ: xem, thêm, sửa, xóa; dữ liệu lưu qua API giả lập json-server.

## Công nghệ

Vite, React 19, TypeScript, Tailwind CSS v4, React Router, axios, json-server.
Form và validate tự viết bằng `useState` (không dùng zod hay react-hook-form).

## Cài đặt và chạy

Cần Node.js 20 trở lên. Mở **hai terminal**:

```bash
npm install

# Terminal 1: chạy API giả lập (http://localhost:3001)
npm run api

# Terminal 2: chạy giao diện (http://localhost:5173)
npm run dev
```

Kiểm tra build: `npm run build`.

Dữ liệu nằm ở `server/db.json`; mọi thay đổi (thêm, sửa, xóa) được ghi vào file này nên tải lại trang vẫn còn.

> Các sự kiện mẫu được chia "Sắp diễn ra" / "Đã diễn ra" theo ngày hôm nay. Nếu sau một thời gian tất cả đã thành "Đã diễn ra", hãy sửa ngày trong `server/db.json` hoặc thêm sự kiện mới.

## Chức năng

- Danh sách chia hai nhóm "Sắp diễn ra" và "Đã diễn ra", phân trang và tìm kiếm theo tên **do API xử lý** (`_page`, `_per_page`, `name:contains`).
- Trang chi tiết `/su-kien/:id`, thêm mới `/su-kien/them`, chỉnh sửa `/su-kien/:id/sua`, trang 404; id không tồn tại hiển thị "Không tìm thấy sự kiện".
- Một component `EventForm` dùng chung cho thêm và sửa. Lỗi hiện khi rời ô và khi bấm gửi; form chỉ hiện ô Địa điểm hoặc ô Đường dẫn tùy hình thức.
- Một hàm validate duy nhất `utils/validateEvent.ts`.
- Xóa có hộp xác nhận tự viết (kèm tên sự kiện), thông báo thành công/thất bại bằng toast tự viết (không dùng `confirm()` và `alert()`).
- Trạng thái đang tải, lỗi (thử tắt `npm run api`), danh sách trống, khóa nút khi đang gửi; giao diện responsive.

## Cấu trúc thư mục

```
src/
  components/   TextField, RadioGroup, EventForm, EventCard, EventSection, ConfirmDialog, toast/...
  layouts/      MainLayout, Header, Footer
  pages/        EventListPage, EventDetailPage, EventCreatePage, EventEditPage, NotFoundPage
  services/     http.ts (axios instance dùng chung), eventService.ts (toàn bộ lời gọi API)
  hooks/        useEvent, useDeleteEvent, useDebounce, useToast
  utils/        validateEvent, eventForm, date, apiError, constants, ui
  types/        event.ts (ClubEvent, EventFormValues, EventFormErrors, ...)
server/db.json  dữ liệu mẫu (10 sự kiện)
```

## Ảnh chụp màn hình

> TODO: chụp và chèn ảnh vào thư mục `screenshots/`, rồi sửa các đường dẫn bên dưới.

| Trang danh sách | Form có lỗi validate | Giao diện điện thoại |
| --- | --- | --- |
| ![Danh sách](screenshots/list.png) | ![Validate](screenshots/validate.png) | ![Mobile](screenshots/mobile.png) |

## Video giới thiệu

> TODO: quay video 3-5 phút, đưa lên Google Drive, mở quyền xem public và dán đường dẫn vào đây.

Link video: <DÁN_LINK_GOOGLE_DRIVE_Ở_ĐÂY>

## Sử dụng AI

Xem `AI_LOG.md`.
