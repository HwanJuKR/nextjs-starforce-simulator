import { IStarData, MVPGrade } from '@/types';

// 스타포스 강화 확률
export const starData: IStarData[] = [
  { starLevel: 0, success: 95.0, fail: 5.0, destroy: 0 },
  { starLevel: 1, success: 90.0, fail: 10.0, destroy: 0 },
  { starLevel: 2, success: 85.0, fail: 15.0, destroy: 0 },
  { starLevel: 3, success: 85.0, fail: 15.0, destroy: 0 },
  { starLevel: 4, success: 80.0, fail: 20.0, destroy: 0 },
  { starLevel: 5, success: 75.0, fail: 25.0, destroy: 0 },
  { starLevel: 6, success: 70.0, fail: 30.0, destroy: 0 },
  { starLevel: 7, success: 65.0, fail: 35.0, destroy: 0 },
  { starLevel: 8, success: 60.0, fail: 40.0, destroy: 0 },
  { starLevel: 9, success: 55.0, fail: 45.0, destroy: 0 },
  { starLevel: 10, success: 50.0, fail: 50.0, destroy: 0 },
  { starLevel: 11, success: 45.0, fail: 55.0, destroy: 0 },
  { starLevel: 12, success: 40.0, fail: 60.0, destroy: 0 },
  { starLevel: 13, success: 35.0, fail: 65.0, destroy: 0 },
  { starLevel: 14, success: 30.0, fail: 70.0, destroy: 0 },
  { starLevel: 15, success: 30.0, fail: 67.9, destroy: 2.1 },
  { starLevel: 16, success: 30.0, fail: 67.9, destroy: 2.1 },
  { starLevel: 17, success: 15.0, fail: 78.2, destroy: 6.8 },
  { starLevel: 18, success: 15.0, fail: 78.2, destroy: 6.8 },
  { starLevel: 19, success: 15.0, fail: 76.5, destroy: 8.5 },
  { starLevel: 20, success: 30.0, fail: 59.5, destroy: 10.5 },
  { starLevel: 21, success: 15.0, fail: 72.25, destroy: 12.75 },
  { starLevel: 22, success: 15.0, fail: 68.0, destroy: 17.0 },
  { starLevel: 23, success: 10.0, fail: 72.0, destroy: 18.0 },
  { starLevel: 24, success: 10.0, fail: 72.0, destroy: 18.0 },
  { starLevel: 25, success: 10.0, fail: 72.0, destroy: 18.0 },
  { starLevel: 26, success: 7.0, fail: 74.4, destroy: 18.6 },
  { starLevel: 27, success: 5.0, fail: 76.0, destroy: 19.0 },
  { starLevel: 28, success: 3.0, fail: 77.6, destroy: 19.4 },
  { starLevel: 29, success: 1.0, fail: 79.2, destroy: 19.8 },
  { starLevel: 30, success: 0, fail: 0, destroy: 0 },
];

// 스타포스 최대 레벨
export const MAX_STAR_FORCE = starData.length - 1;

// 파괴 후 리셋 레벨
export const DESTROY_RESET_LEVEL = 12;

// 5, 10, 15성에서는 강화시 성공확률 100% 이벤트
export const PERFECT_SUCCESS_LEVEL = [5, 10, 15];

// 15성부터 17성까지만 파괴 방지 옵션 활성화
export const PREVENT_DESTROY_MIN_LEVEL = 15;

// 15성부터 17성까지만 파괴 방지 옵션 활성화
export const PREVENT_DESTROY_MAX_LEVEL = 17;

// 21성 이하에서는 파괴 확률 30% 감소 이벤트
export const REDUCED_DESTROY_MAX_LEVEL = 21;

// 10성 이하에서는 강화 시 1+1 이벤트
export const DOUBLE_ENHANCE_MAX_LEVEL = 10;

// MVP 등급별 할인율
export const MVP_DISCOUNT_RATE: Record<MVPGrade, number> = {
  none: 0,
  silver: 0.03,
  gold: 0.05,
  diamond: 0.1,
};

// PC방 할인율
export const PC_ROOM_DISCOUNT_RATE = 0.05;

// MVP 등급 옵션 데이터
export const MVP_GRADE_OPTION = [
  { grade: "none", label: "없음", discount: "0%" },
  { grade: "silver", label: "실버", discount: "3%" },
  { grade: "gold", label: "골드", discount: "5%" },
  { grade: "diamond", label: "다이아", discount: "10%" },
] as const;

// 이벤트 할인율
export const EVENT_DISCOUNT_RATE = 0.7;

// NEXON Open API
export const NEXON_API_BASE_URL = 'https://open.api.nexon.com';

// API 조회 설정 기본값
export const DEFAULT_QUERY_COUNT = '100';
export const MIN_QUERY_COUNT = 10;
export const MAX_QUERY_COUNT = 1000;
export const MIN_QUERY_DATE = '2023-12-27';
