/** Thông báo / tin tức của trường, lưu trong server/db.json (mục "news") */
export interface NewsItem {
  id: string
  title: string
  /** Định dạng YYYY-MM-DD */
  date: string
  category: string
  /** Đường dẫn tới bài gốc trên trang của trường */
  url: string
}
