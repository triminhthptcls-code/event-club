import type { NewsItem } from '../types/news'
import { http } from './http'

/** GET toàn bộ thông báo, mới nhất lên đầu */
export async function getNews(): Promise<NewsItem[]> {
  const response = await http.get<NewsItem[]>('/news', {
    params: { _sort: '-date' },
  })
  return response.data
}
