import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Đường dẫn tương đối để chạy được ở thư mục con (GitHub Pages: /<tên-repo>/)
  base: './',
})
