import axios from 'axios'

/** Axios instance dùng chung cho toàn bộ ứng dụng */
export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
})
