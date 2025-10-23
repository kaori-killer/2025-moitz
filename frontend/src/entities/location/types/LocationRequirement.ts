/**
 * 장소 요구사항에 대한 도메인 상수와 타입 정의
 */

export const LOCATION_REQUIREMENTS = [
  'CAFE',
  'RESTAURANT',
  'BAR',
  'STUDY_CAFE',
  'SPACE_RENTAL',
  'PC_ROOM_KARAOKE',
  'ACTIVITY',
  'ENTERTAINMENT',
] as const;

export type LocationRequirement = (typeof LOCATION_REQUIREMENTS)[number];

/**
 * 장소 요구사항에 대한 기본 정보
 * UI와 무관한 도메인 레벨의 데이터
 */
export const LOCATION_REQUIREMENT_BASE = {
  CAFE: {
    id: 'CAFE' as const,
    text: '카페',
  },
  RESTAURANT: {
    id: 'RESTAURANT' as const,
    text: '식당',
  },
  BAR: {
    id: 'BAR' as const,
    text: '술집',
  },
  STUDY_CAFE: {
    id: 'STUDY_CAFE' as const,
    text: '스터디카페',
  },
  SPACE_RENTAL: {
    id: 'SPACE_RENTAL' as const,
    text: '파티룸',
  },
  PC_ROOM_KARAOKE: {
    id: 'PC_ROOM_KARAOKE' as const,
    text: 'PC방/노래방',
  },
  ACTIVITY: {
    id: 'ACTIVITY' as const,
    text: '액티비티',
  },
  ENTERTAINMENT: {
    id: 'ENTERTAINMENT' as const,
    text: '엔터테인먼트',
  },
} as const;

// 타입 가드
export function isValidLocationRequirement(
  value: unknown,
): value is LocationRequirement {
  return typeof value === 'string' && value in LOCATION_REQUIREMENT_BASE;
}
