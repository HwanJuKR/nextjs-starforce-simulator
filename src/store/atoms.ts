import { atom } from 'jotai';
import { calculateEnhanceCost } from '@/hooks/useCost';

// 이벤트
export interface IEvent {
  doubleEnhance: boolean; // 10성 이하에서 강화 시 1+1
  costDiscount: boolean; // 비용 30% 할인
  perfectSuccess: boolean; // 5, 10, 15성에서는 강화시 성공확률 100%
  reducedDestroy: boolean; // 21성 이하에서는 파괴 확률 30% 감소
  shiningStarforce: boolean; // 샤이닝 스타포스
}

export const eventAtom = atom<IEvent>({
  doubleEnhance: false,
  costDiscount: false,
  perfectSuccess: false,
  reducedDestroy: false,
  shiningStarforce: false,
});

// 강화
export const currentStarLevelAtom = atom(0);
export const targetStarLevelAtom = atom(30);
export const equipLevelAtom = atom(150);
export const isSimulatingAtom = atom(false);

// 통계
export interface IStats {
  attempt: number;
  success: number;
  destroy: number;
  maxStarLevel: number;
  totalCost: number;
}

export const statsAtom = atom<IStats>({
  attempt: 0,
  success: 0,
  destroy: 0,
  maxStarLevel: 0,
  totalCost: 0,
});

export const starLevelStatsAtom = atom<Pick<IStats, "attempt" | "success" | "destroy">[]>(
  Array.from({ length: 31 }, () => ({ attempt: 0, success: 0, destroy: 0 }))
);

// 현재 강화 비용 계산
export const currentCostAtom = atom((get) => {
  const equipLevel = get(equipLevelAtom);
  const currentStarLevel = get(currentStarLevelAtom);
  const event = get(eventAtom);

  return calculateEnhanceCost(equipLevel, currentStarLevel, event);
});
