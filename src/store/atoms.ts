import { atom } from "jotai";
import { calculateEnhanceCost } from "@/hooks/useCost";
import {
  EquipLevel,
  IEvent,
  IStats,
  StarLevel,
  StarLevelStats,
  IBenefit,
} from "@/types";
import { DEFAULT_QUERY_COUNT } from "@/constants/starData";

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
export const preventDestroyAtom = atom(false);
export const starCatchAtom = atom(false);

// 혜택
export const benefitAtom = atom<IBenefit>({
  pcRoom: false,
  mvpGrade: "none",
});

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
  const preventDestroy = get(preventDestroyAtom);
  const benefit = get(benefitAtom);

  return calculateEnhanceCost(
    equipLevel,
    currentStarLevel,
    event,
    preventDestroy,
    benefit
  );
});

// 히스토리 조회
export const historyApiKeyAtom = atom("");
export const historyCountAtom = atom(DEFAULT_QUERY_COUNT);
export const historyDateAtom = atom(new Date().toISOString().split("T")[0]);
