const MAX_SIDE = 1000
const MAX_FILE_BYTES = 10 * 1024 * 1024
/** Giới hạn độ dài chuỗi data URL sau khi nén (để db.json không phình to) */
export const IMAGE_MAX_CHARS = 200_000

function loadImage(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file)
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Không đọc được ảnh này, vui lòng chọn ảnh khác.'))
    }
    img.src = url
  })
}

/** Đọc ảnh người dùng chọn, thu nhỏ và nén thành JPEG dạng data URL */
export async function fileToCompressedDataUrl(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Vui lòng chọn một tệp ảnh (JPG, PNG, WebP...).')
  }
  if (file.size > MAX_FILE_BYTES) {
    throw new Error('Ảnh quá lớn, vui lòng chọn ảnh dưới 10 MB.')
  }

  const img = await loadImage(file)
  let scale = Math.min(1, MAX_SIDE / Math.max(img.width, img.height))

  for (let attempt = 0; attempt < 6; attempt++) {
    const width = Math.max(1, Math.round(img.width * scale))
    const height = Math.max(1, Math.round(img.height * scale))
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Trình duyệt không hỗ trợ xử lý ảnh.')

    // Nền trắng để ảnh PNG trong suốt không bị đen khi đổi sang JPEG
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, width, height)
    context.drawImage(img, 0, 0, width, height)

    for (const quality of [0.8, 0.7, 0.6, 0.5]) {
      const url = canvas.toDataURL('image/jpeg', quality)
      if (url.length <= IMAGE_MAX_CHARS) return url
    }
    scale *= 0.8
  }
  throw new Error('Không nén được ảnh đủ nhỏ, vui lòng chọn ảnh khác.')
}
