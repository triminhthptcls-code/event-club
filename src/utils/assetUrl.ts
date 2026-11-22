/**
 * Đổi đường dẫn tuyệt đối trong public (vd. "/images/clubs/IBC.png") thành đường dẫn
 * đúng với thư mục gốc của ứng dụng, để vẫn chạy khi đưa lên GitHub Pages (thư mục con).
 * Đường dẫn http(s), data: hoặc blob: được giữ nguyên.
 */
export function assetUrl(path: string): string {
  return path.startsWith('/') && !path.startsWith('//')
    ? import.meta.env.BASE_URL + path.slice(1)
    : path
}
