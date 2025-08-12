import { starData, MAX_STAR_FORCE } from "@/constants/starData";
import { useState } from "react";
import useCost from "./useCost";

interface IEnhanceResult {
  starLevel: number;
  result: string;
  isSuccess: boolean;
  isDestroy: boolean;
  chance: number;
}

export default function useEnhance() {
  const [current, setCurrent] = useState(0);
  const [targetStarLevel, setTargetStarLevel] = useState(30);
  const [isSimulating, setIsSimulating] = useState(false);
  const [stats, setStats] = useState({
    attempt: 0,
    successe: 0,
    destroy: 0,
    maxStarLevel: 0,
    totalCost: 0,
  });
  const [starLevelStats, setStarLevelStats] = useState(
    Array.from({ length: 31 }, () => ({ attempt: 0, successe: 0, destroy: 0 }))
  );
  
  const [equipLevel, setEquipLevel] = useState(150);
  const enhanceCost = useCost();

  const enhance = (currentStarLevel: number): IEnhanceResult => {
    const { success, fail } = starData[currentStarLevel];
    const chance = Math.random() * 100;
    let starLevel = currentStarLevel;
    let result = "";

    if (chance < success) {
      starLevel = currentStarLevel + 1;
      if (starLevel >= starData.length - 1) {
        result = `${starData[currentStarLevel].starLevel} → 성공! 30성 달성!`;
      } else {
        result = `${starData[currentStarLevel].starLevel} → 성공!`;
      }
    } else if (chance < success + fail) {
      result = `${starData[currentStarLevel].starLevel} → 실패(유지)`;
    } else {
      starLevel = 12;
      result = `${starData[currentStarLevel].starLevel} → 파괴! 12성으로 다운`;
    }

    return {
      starLevel,
      result,
      isSuccess: chance < success,
      isDestroy: chance >= success + fail,
      chance,
    };
  };

  const tryEnhance = () => {
    if (current >= MAX_STAR_FORCE) return;

    const currentStarLevel = current;
    const cost = enhanceCost(equipLevel, currentStarLevel);
    const result = enhance(currentStarLevel);
    setCurrent(result.starLevel);

    // 통계 업데이트
    setStats((prev) => ({
      ...prev,
      attempt: prev.attempt + 1,
      successe: result.isSuccess ? prev.successe + 1 : prev.successe,
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
        successe: starLevelStat.successe + (result.isSuccess ? 1 : 0),
        destroy: starLevelStat.destroy + (result.isDestroy ? 1 : 0),
      };
      return newStats;
    });
  };

  const bulkSimulate = async (count: number) => {
    setIsSimulating(true);
    let tempCurrent = current;
    const tempStats = { ...stats };
    const tempStarLevelStats = [...starLevelStats];
    const checkPoint = 1000;

    for (let i = 0; i < count; i++) {
      if (tempCurrent >= MAX_STAR_FORCE) {
        break;
      }

      // 목표 수치 달성 체크
      if (tempCurrent >= targetStarLevel) {
        break;
      }

      const currentStarLevel = tempCurrent;
      const cost = enhanceCost(equipLevel, currentStarLevel);
      const result = enhance(tempCurrent);
      tempStats.attempt++;
      tempStats.totalCost += cost;
      tempStarLevelStats[tempCurrent].attempt++;
      tempCurrent = result.starLevel;
      tempStats.maxStarLevel = Math.max(tempStats.maxStarLevel, tempCurrent);

      if (result.isSuccess) {
        tempStats.successe++;
        tempStarLevelStats[currentStarLevel].successe++;
      } else if (result.isDestroy) {
        tempStats.destroy++;
        tempStarLevelStats[currentStarLevel].destroy++;
      }

      if (tempCurrent >= MAX_STAR_FORCE) {
        break;
      }

      if ((i + 1) % checkPoint === 0) {
        setCurrent(tempCurrent);
        setStats({ ...tempStats });
        setStarLevelStats([...tempStarLevelStats]);

        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    }

    setCurrent(tempCurrent);
    setStats(tempStats);
    setStarLevelStats(tempStarLevelStats);
    setIsSimulating(false);
  };

  const reset = () => {
    setCurrent(0);
    setStats({ attempt: 0, destroy: 0, successe: 0, maxStarLevel: 0, totalCost: 0 });
    setStarLevelStats(
      Array.from({ length: 31 }, () => ({
        attempt: 0,
        successe: 0,
        destroy: 0,
      }))
    );
  };

  return {
    current,
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
