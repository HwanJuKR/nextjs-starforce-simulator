// MVP 등급 타입
export type MVPGrade = "none" | "silver" | "gold" | "diamond";

// 혜택
export interface IBenefit {
  pcRoom: boolean;
  mvpGrade: MVPGrade;
}
