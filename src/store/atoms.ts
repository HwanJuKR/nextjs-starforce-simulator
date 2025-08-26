import { atom } from 'jotai';
import { calculateEnhanceCost } from '@/hooks/useCost';
import { EquipLevel, IEvent, IStats, StarLevel, StarLevelStats } from '@/types';

// 이벤트
export const eventAtom = atom<IEvent>({
  doubleEnhance: false,
  costDiscount: false,
  perfectSuccess: false,
  reducedDestroy: false,
  shiningStarforce: false,
});

// 강화
export const currentStarLevelAtom = atom<StarLevel>(0);
export const targetStarLevelAtom = atom<StarLevel>(30);
export const equipLevelAtom = atom<EquipLevel>(150);
export const isSimulatingAtom = atom(false);

export const statsAtom = atom<IStats>({
  attempt: 0,
  success: 0,
  destroy: 0,
  maxStarLevel: 0,
  totalCost: 0,
});

export const starLevelStatsAtom = atom<StarLevelStats[]>(
  Array.from({ length: 31 }, () => ({ attempt: 0, success: 0, destroy: 0 }))
);

// 현재 강화 비용 계산
export const currentCostAtom = atom((get) => {
  const equipLevel = get(equipLevelAtom);
  const currentStarLevel = get(currentStarLevelAtom);
  const event = get(eventAtom);

  return calculateEnhanceCost(equipLevel, currentStarLevel, event);
});
