export interface IEvent {
  doubleEnhance: boolean; // 10성 이하에서 강화 시 1+1
  costDiscount: boolean; // 비용 30% 할인
  perfectSuccess: boolean; // 5, 10, 15성에서는 강화시 성공확률 100%
  reducedDestroy: boolean; // 21성 이하에서는 파괴 확률 30% 감소
  shiningStarforce: boolean; // 샤이닝 스타포스
}
