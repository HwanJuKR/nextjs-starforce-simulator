// MVP 등급 타입
export type MVPGrade = "none" | "silver" | "gold" | "diamond";

// 혜택
export interface IBenefit {
  pcRoom: boolean;
  mvpGrade: MVPGrade;
}

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
