/** Nhóm đơn vị tổ chức sự kiện (Nhà trường, các nhóm CLB) */
export type ClubGroup =
  | 'school'
  | 'academic'
  | 'hobby'
  | 'movement'
  | 'language'
  | 'media'
  | 'volunteer'
  | 'hometown'

export interface Club {
  /** Mã dùng để lưu trong db.json (trường `club` của sự kiện) */
  id: string
  /** Tên viết tắt hiển thị trên icon khi chưa có logo */
  short: string
  name: string
  group: ClubGroup
  /** Đường dẫn logo trong public/ (nếu có) */
  logo?: string
}

/** Mã đơn vị đặc biệt: sự kiện do Nhà trường tổ chức (không phải CLB, không có thành viên) */
export const SCHOOL_ID = 'truong'

export const CLUB_GROUPS: { id: ClubGroup; label: string; color: string }[] = [
  { id: 'school', label: 'Nhà trường', color: '#b01820' },
  { id: 'academic', label: 'Học thuật', color: '#b01820' },
  { id: 'hobby', label: 'Sở thích', color: '#7c3aed' },
  { id: 'movement', label: 'Hỗ trợ phong trào', color: '#0d9488' },
  { id: 'language', label: 'Ngoại ngữ', color: '#2563eb' },
  { id: 'media', label: 'Truyền thông', color: '#ea580c' },
  { id: 'volunteer', label: 'Tình nguyện', color: '#16a34a' },
  { id: 'hometown', label: 'Hội đồng hương', color: '#64748b' },
]

const L = '/images/clubs/'

export const CLUBS: Club[] = [
  {
    id: SCHOOL_ID,
    short: 'FTU',
    name: 'Trường Đại học Ngoại thương',
    group: 'school',
    logo: '/images/ftu-logo.png',
  },
  { id: 'ibc', short: 'IBC', name: 'CLB Kinh doanh Quốc tế - IBC FTU', group: 'academic', logo: L + 'IBC.png' },
  { id: 'sic', short: 'SIC', name: 'CLB Chứng khoán SIC - FTU', group: 'academic', logo: L + 'SIC.png' },
  { id: 'sac', short: 'SAC', name: 'CLB Du học - SAC', group: 'academic', logo: L + 'SAC.png' },
  { id: 'tec', short: 'TEC', name: 'CLB Nhà Doanh nghiệp Tương lai - TEC', group: 'academic', logo: L + 'TEC.jpg' },
  { id: 'mac', short: 'MAC', name: 'CLB Marketing - MAC', group: 'academic', logo: L + 'MAC.jpg' },
  { id: 'ecom', short: 'ECOM', name: 'CLB Thương mại điện tử - ECOM', group: 'academic', logo: L + 'ECOM.webp' },
  { id: 'gec', short: 'GEC', name: 'CLB Kinh tế toàn cầu - GEC', group: 'academic', logo: L + 'GEC.jpg' },
  { id: 'ipc', short: 'IPC', name: 'CLB Sở hữu trí tuệ - IPC', group: 'academic', logo: L + 'IPC.jpg' },
  { id: 'cfaa', short: 'CFAA', name: 'CLB Kế Toán Kiểm Toán Viên tương lai - CFAA', group: 'academic', logo: L + 'CFAA.jpg' },
  { id: 'yrc', short: 'YRC', name: 'CLB Sinh viên nghiên cứu khoa học - YRC', group: 'academic', logo: L + 'YRC.jpg' },
  { id: 'hrc', short: 'HRC', name: 'CLB Nguồn nhân lực - HRC', group: 'academic', logo: L + 'HRC.jpg' },
  { id: 'fbn', short: 'FBN', name: 'CLB Nhà ngân hàng tương lai - FBN', group: 'academic', logo: L + 'FBN.jpg' },
  { id: 'rec', short: 'REC', name: 'CLB Nghiên Cứu Thị Trường Bất Động Sản - REC', group: 'academic', logo: L + 'REC.png' },
  { id: 'enactus', short: 'ENA', name: 'CLB Enactus', group: 'academic', logo: L + 'ENA.png' },
  { id: 'mrc', short: 'MRC', name: 'CLB Nhà nghiên cứu Thị trường - MRC', group: 'academic', logo: L + 'MRC.png' },
  { id: 'qec', short: 'QEC', name: 'CLB Nhà Kinh tế Định lượng - QEC', group: 'academic', logo: L + 'QEC.jpg' },
  { id: 'cte', short: 'CTE', name: 'CLB CTE', group: 'academic', logo: L + 'CTE.jpg' },
  { id: 'mc', short: 'MC', name: 'CLB Âm nhạc - MC', group: 'hobby', logo: L + 'MC.jpg' },
  { id: 'kdc', short: 'KDC', name: 'CLB Khám phá Hàn Quốc - KDC', group: 'hobby', logo: L + 'KDC.jpg' },
  { id: 'fsc', short: 'FSC', name: 'CLB Thể thao - FSC', group: 'hobby', logo: L + 'FSC.jpg' },
  { id: 'fgc', short: 'FGC', name: 'CLB Guitar - FGC', group: 'hobby', logo: L + 'FGC.jpg' },
  { id: 'dc', short: 'DC', name: 'CLB Dancing - DC', group: 'hobby', logo: L + 'DC.jpg' },
  { id: 'tcm', short: 'TCM', name: 'CLB Tuyên truyền ca khúc Cách mạng - TCM', group: 'hobby', logo: L + 'TCM.jpg' },
  { id: 'lsc', short: 'LSC', name: 'CLB Kỹ năng sống - LSC', group: 'movement', logo: L + 'LSC.jpg' },
  { id: 'eacc', short: 'EACC', name: 'CLB Văn hóa ngoại giao - EACC', group: 'movement', logo: L + 'EACC.jpg' },
  { id: 'cfe', short: 'CFE', name: 'CLB Tiếng Pháp - CFE', group: 'language', logo: L + 'CFE.jpg' },
  { id: 'cc', short: 'CC', name: 'CLB Tiếng Trung - CC', group: 'language', logo: L + 'CC.jpg' },
  { id: 'jpc', short: 'JPC', name: 'CLB Tiếng Nhật - JPC', group: 'language', logo: L + 'JPC.jpg' },
  { id: 'forum', short: 'FORUM', name: 'Diễn đàn sinh viên Trường Đại học Ngoại thương - FTU FORUM', group: 'media', logo: L + 'FORUM.jpg' },
  { id: 'ymc', short: 'YMC', name: 'Câu lạc bộ truyền thông - YMC', group: 'media', logo: L + 'YMC.png' },
  { id: '350', short: '350', name: 'CLB Môi trường 350 Việt Nam - 350', group: 'volunteer', logo: L + '350.jpg' },
  { id: 'chc', short: 'CHC', name: 'CLB Kết nối trái tim (Đội máu Ngoại thương) - CHC', group: 'volunteer', logo: L + 'CHC.jpg' },
  { id: 'nghean', short: 'NA', name: 'CLB Tình Nguyện Đồng Hương Nghệ An Đại học Ngoại Thương', group: 'hometown', logo: L + 'images.png' },
]

const CLUB_MAP = new Map(CLUBS.map((club) => [club.id, club]))

export function getClub(id: string): Club | undefined {
  return CLUB_MAP.get(id)
}

export function getGroupColor(group: ClubGroup): string {
  return CLUB_GROUPS.find((item) => item.id === group)?.color ?? '#64748b'
}

/** CLB mà sinh viên có thể tham gia (loại trừ Nhà trường) */
export const JOINABLE_CLUBS = CLUBS.filter((club) => club.group !== 'school')
