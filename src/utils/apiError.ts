import axios from 'axios'

/** Lỗi nghiệp vụ có sẵn thông báo tiếng Việt (vd. hết chỗ, sai mật khẩu) */
export class AppError extends Error {}

/** Đổi lỗi bất kỳ thành thông báo tiếng Việt dễ hiểu */
export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) return error.message
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') {
      return 'Máy chủ phản hồi quá lâu. Vui lòng thử lại.'
    }
    if (!error.response) {
      return 'Không kết nối được tới máy chủ. Hãy kiểm tra json-server đã chạy chưa (npm run api).'
    }
    if (error.response.status === 404) {
      return 'Không tìm thấy dữ liệu yêu cầu.'
    }
    return `Máy chủ trả về lỗi (mã ${error.response.status}). Vui lòng thử lại sau.`
  }
  return 'Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.'
}

export function isNotFoundError(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 404
}
