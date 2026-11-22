/** Lỗi nghiệp vụ có sẵn thông báo tiếng Việt (vd. hết chỗ, sai mật khẩu) */
export class AppError extends Error {}

/** Không tìm thấy dữ liệu (tương đương HTTP 404) */
export class NotFoundError extends AppError {
  constructor(message = 'Không tìm thấy dữ liệu yêu cầu.') {
    super(message)
  }
}

/** Đổi lỗi bất kỳ thành thông báo tiếng Việt dễ hiểu */
export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) return error.message
  return 'Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.'
}

export function isNotFoundError(error: unknown): boolean {
  return error instanceof NotFoundError
}
