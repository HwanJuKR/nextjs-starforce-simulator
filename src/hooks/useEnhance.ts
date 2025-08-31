import { starData, MAX_STAR_FORCE } from "@/constants/starData";
import { useAtom, useAtomValue } from "jotai";
import { 
  currentStarLevelAtom, 
  targetStarLevelAtom, 
  equipLevelAtom, 
  isSimulatingAtom, 
  statsAtom, 
  starLevelStatsAtom,
  eventAtom,
  preventDestroyAtom,
  starCatchAtom,
} from "@/store/atoms";
import { calculateEnhanceCost } from "./useCost";
import { IEnhanceResult, IEvent, IEnhanceChance, StarLevel, toStarLevel } from "@/types";

// 강화 확률 계산 함수
export const calculateEnhanceChance = (starLevel: StarLevel, event: IEvent, preventDestroy: boolean, starCatch: boolean): IEnhanceChance => {
  const { success, fail, destroy } = starData[starLevel];

  // 5, 10, 15성에서 perfectSuccess 이벤트가 활성화된 경우 성공확률 100%
  const isPerfectSuccessLevel = [5, 10, 15].includes(starLevel);
  const isPerfectSuccess = event.perfectSuccess && isPerfectSuccessLevel;

  // 21성 이하에서 reducedDestroy 또는 shiningStarforce 이벤트가 활성화된 경우 파괴 확률 30% 감소
  const isReducedDestroyLevel = starLevel <= 21;
  let destroyChance = 
    (event.reducedDestroy || event.shiningStarforce) && isReducedDestroyLevel
      ? destroy * 0.7
      : destroy;

  // 15성부터 17성까지 파괴 방지 옵션이 활성화된 경우 파괴 확률 0%
  if (preventDestroy && starLevel >= 15 && starLevel <= 17) {
    destroyChance = 0;
  }

  let finalSuccess = isPerfectSuccess ? 100 : success;
  let finalDestroy = isPerfectSuccess ? 0 : destroyChance;
  let finalFail = isPerfectSuccess ? 0 : fail;

  // 스타캐치 적용
  if (starCatch && !isPerfectSuccess) {
    // 성공률 1.05배 상승
    finalSuccess = success * 1.05;
    
    // 파괴확률 감소: 성공률 × 0.05 × (파괴/(파괴+유지))
    const destroyReduce = success * 0.05 * (destroy / (destroy + fail));
    finalDestroy = destroyChance - destroyReduce;
    
    // 실패확률 조정
    finalFail = 100 - finalSuccess - finalDestroy;
  }

  return {
    success: finalSuccess,
    fail: finalFail,
    destroy: finalDestroy,
    isPerfectSuccess,
    destroyReduction: finalDestroy < destroy
  };
};

export default function useEnhance() {
  const [currentStarLevel, setCurrentStarLevel] = useAtom(currentStarLevelAtom);
  const [targetStarLevel, setTargetStarLevel] = useAtom(targetStarLevelAtom);
  const [equipLevel, setEquipLevel] = useAtom(equipLevelAtom);
  const [isSimulating, setIsSimulating] = useAtom(isSimulatingAtom);
  const [stats, setStats] = useAtom(statsAtom);
  const [starLevelStats, setStarLevelStats] = useAtom(starLevelStatsAtom);
  const event = useAtomValue(eventAtom);
  const preventDestroy = useAtomValue(preventDestroyAtom);
  const starCatch = useAtomValue(starCatchAtom);

  const enhance = (currentStarLevel: StarLevel): IEnhanceResult => {
    const chance = calculateEnhanceChance(currentStarLevel, event, preventDestroy, starCatch);
    const randomValue = Math.random() * 100;
    let starLevel = currentStarLevel;
    let result = "";

    if (chance.isPerfectSuccess || randomValue < chance.success) {
      // 10성 이하에서 1+1 이벤트가 활성화된 경우 2단계 상승
      if (event.doubleEnhance && currentStarLevel <= 10) {
        starLevel = toStarLevel(currentStarLevel + 2);
        result = `${starData[currentStarLevel].starLevel + "성"} → 성공!`;
      } else {
        starLevel = toStarLevel(currentStarLevel + 1);
        if (starLevel >= starData.length - 1) {
          result = `${starData[currentStarLevel].starLevel + "성"} → 성공! 30성 달성!`;
        } else {
          result = `${starData[currentStarLevel].starLevel + "성"} → 성공!`;
        }
      }
    } else if (randomValue < chance.success + chance.fail) {
      result = `${starData[currentStarLevel].starLevel + "성"} → 실패(유지)`;
    } else if (randomValue < chance.success + chance.fail + chance.destroy) {
      starLevel = 12;
      result = `${starData[currentStarLevel].starLevel + "성"} → 파괴! 12성으로 다운`;
    }

    return {
      starLevel,
      result,
      isSuccess: chance.isPerfectSuccess || randomValue < chance.success,
      isDestroy: randomValue >= chance.success + chance.fail && randomValue < chance.success + chance.fail + chance.destroy,
      randomValue,
    };
  };

  const tryEnhance = () => {
    if (currentStarLevel >= MAX_STAR_FORCE) return;

    const starLevel = currentStarLevel;
    const cost = calculateEnhanceCost(equipLevel, starLevel, event, preventDestroy);
    const result = enhance(starLevel);
    setCurrentStarLevel(result.starLevel);

    // 통계 업데이트
    setStats((prev) => ({
      ...prev,
      attempt: prev.attempt + 1,
      success: result.isSuccess ? prev.success + 1 : prev.success,
      destroy: result.isDestroy ? prev.destroy + 1 : prev.destroy,
      maxStarLevel: Math.max(prev.maxStarLevel, result.starLevel),
      totalCost: prev.totalCost + cost,
    }));

    // 레벨별 통계 업데이트
    setStarLevelStats((prev) => {
      const newStats = [...prev];
      const starLevelStat = newStats[currentStarLevel];
      newStats[currentStarLevel] = {
        attempt: starLevelStat.attempt + 1,
        success: starLevelStat.success + (result.isSuccess ? 1 : 0),
        destroy: starLevelStat.destroy + (result.isDestroy ? 1 : 0),
      };
      return newStats;
    });
  };

  const bulkSimulate = async (count: number) => {
    setIsSimulating(true);
    let tempCurrentStarLevel = currentStarLevel;
    const tempStats = { ...stats };
    const tempStarLevelStats = [...starLevelStats];
    const checkPoint = 1000;

    for (let i = 0; i < count; i++) {
      if (tempCurrentStarLevel >= MAX_STAR_FORCE) {
        break;
      }

      // 목표 수치 달성 체크
      if (tempCurrentStarLevel >= targetStarLevel) {
        break;
      }

      const starLevel = tempCurrentStarLevel;
      const cost = calculateEnhanceCost(equipLevel, starLevel, event, preventDestroy);
      const result = enhance(tempCurrentStarLevel);
      tempStats.attempt++;
      tempStats.totalCost += cost;
      tempStarLevelStats[tempCurrentStarLevel].attempt++;
      tempCurrentStarLevel = result.starLevel;
      tempStats.maxStarLevel = Math.max(tempStats.maxStarLevel, tempCurrentStarLevel);

      if (result.isSuccess) {
        tempStats.success++;
        tempStarLevelStats[starLevel].success++;
      } else if (result.isDestroy) {
        tempStats.destroy++;
        tempStarLevelStats[starLevel].destroy++;
      }

      if (tempCurrentStarLevel >= MAX_STAR_FORCE) {
        break;
      }

      if ((i + 1) % checkPoint === 0) {
        setCurrentStarLevel(tempCurrentStarLevel);
        setStats({ ...tempStats });
        setStarLevelStats([...tempStarLevelStats]);

        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    }

    setCurrentStarLevel(tempCurrentStarLevel);
    setStats(tempStats);
    setStarLevelStats(tempStarLevelStats);
    setIsSimulating(false);
  };

  const reset = () => {
    setCurrentStarLevel(0);
    setStats({
      attempt: 0,
      destroy: 0,
      success: 0,
      maxStarLevel: 0,
      totalCost: 0,
    });
    setStarLevelStats(
      Array.from({ length: 31 }, () => ({
        attempt: 0,
        success: 0,
        destroy: 0,
      }))
    );
  };

  return {
    currentStarLevel,
    isSimulating,
    stats,
    starLevelStats,
    targetStarLevel,
    setTargetStarLevel,
    equipLevel,
    setEquipLevel,
    tryEnhance,
    bulkSimulate,
    reset,
    enhance,
  };
}
