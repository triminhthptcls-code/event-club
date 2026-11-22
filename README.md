# CLB Events - Quản lý sự kiện câu lạc bộ

Bài tập lớn: ứng dụng CRUD với React. Quản lý sự kiện câu lạc bộ: xem, thêm, sửa, xóa; dữ liệu lưu ở localStorage (nạp từ db.json).

## Công nghệ

Vite, React 19, TypeScript, Tailwind CSS v4, React Router.
Form và validate tự viết bằng `useState` (không dùng zod hay react-hook-form).

## Cài đặt và chạy

Cần Node.js 20 trở lên.

```bash
npm install
npm run dev      # http://localhost:5173
```

Không cần chạy máy chủ riêng: dữ liệu được lưu ở `localStorage` của trình duyệt, lần đầu nạp từ `server/db.json` (xem `src/services/http.ts`). Muốn trở về dữ liệu mẫu ban đầu, xóa dữ liệu trang (Application → Local Storage → Clear) rồi tải lại. Kiểm tra build: `npm run build`.

Tài khoản demo: sinh viên `sv01` / `sv123456`; CLB: tên đăng nhập là mã CLB (vd. `ibc`) / `club123`; Nhà trường: `truong` / `club123`.

### Đưa lên GitHub Pages

Đẩy code lên nhánh `master`, vào Settings → Pages → Source chọn **GitHub Actions**. Workflow `.github/workflows/deploy.yml` tự build và deploy. Router dùng `HashRouter` và `base: './'` nên chạy được ở thư mục con của GitHub Pages. Vì dữ liệu nằm ở trình duyệt, mỗi người dùng chỉ thấy dữ liệu của chính mình (phù hợp để demo).

> Script `npm run api` (json-server) vẫn còn nhưng ứng dụng không còn dùng tới.

> Các sự kiện mẫu được chia "Sắp diễn ra" / "Đã diễn ra" theo ngày hôm nay.

## Chức năng

- Danh sách chia hai nhóm "Sắp diễn ra" và "Đã diễn ra", phân trang và tìm kiếm theo tên và lọc CLB (xử lý ở `eventService.getEvents`).
- Trang chi tiết `/su-kien/:id`, thêm mới `/su-kien/them`, chỉnh sửa `/su-kien/:id/sua`, trang 404; id không tồn tại hiển thị "Không tìm thấy sự kiện".
- Một component `EventForm` dùng chung cho thêm và sửa. Lỗi hiện khi rời ô và khi bấm gửi; form chỉ hiện ô Địa điểm hoặc ô Đường dẫn tùy hình thức.
- Một hàm validate duy nhất `utils/validateEvent.ts`.
- Xóa có hộp xác nhận tự viết (kèm tên sự kiện), thông báo thành công/thất bại bằng toast tự viết (không dùng `confirm()` và `alert()`).
- Trạng thái đang tải, lỗi, danh sách trống, khóa nút khi đang gửi; giao diện responsive.

## Cấu trúc thư mục

```
src/
  components/   TextField, RadioGroup, EventForm, EventCard, EventSection, ConfirmDialog, toast/...
  layouts/      MainLayout, Header, Footer
  pages/        EventListPage, EventDetailPage, EventCreatePage, EventEditPage, NotFoundPage
  services/     http.ts (kho dữ liệu localStorage giả lập API), các service gọi qua http
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
