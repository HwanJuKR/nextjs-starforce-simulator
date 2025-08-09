import { starData, MAX_STAR_FORCE } from "@/constants/starData";
import { useState } from "react";

interface IEnhanceResult {
  level: number;
  result: string;
  isSuccess: boolean;
  isDestroy: boolean;
  chance: number;
}

export default function useEnhance() {
  const [current, setCurrent] = useState(0);
  const [targetLevel, setTargetLevel] = useState(30);
  const [isSimulating, setIsSimulating] = useState(false);
  const [stats, setStats] = useState({
    attempt: 0,
    successe: 0,
    destroy: 0,
    maxLevel: 0,
  });
  const [levelStats, setLevelStats] = useState(
    Array.from({ length: 31 }, () => ({ attempt: 0, successe: 0, destroy: 0 }))
  );

  const enhance = (currentLevel: number): IEnhanceResult => {
    const { success, fail } = starData[currentLevel];
    const chance = Math.random() * 100;
    let level = currentLevel;
    let result = "";

    if (chance < success) {
      level = currentLevel + 1;
      if (level >= starData.length - 1) {
        result = `${starData[currentLevel].level} → 성공! 30성 달성!`;
      } else {
        result = `${starData[currentLevel].level} → 성공!`;
      }
    } else if (chance < success + fail) {
      result = `${starData[currentLevel].level} → 실패(유지)`;
    } else {
      level = 12;
      result = `${starData[currentLevel].level} → 파괴! 12성으로 다운`;
    }

    return {
      level,
      result,
      isSuccess: chance < success,
      isDestroy: chance >= success + fail,
      chance,
    };
  };

  const tryEnhance = () => {
    if (current >= MAX_STAR_FORCE) return;

    const currentLevel = current;
    const result = enhance(currentLevel);
    setCurrent(result.level);

    // 통계 업데이트
    setStats((prev) => ({
      ...prev,
      attempt: prev.attempt + 1,
      successe: result.isSuccess ? prev.successe + 1 : prev.successe,
      destroy: result.isDestroy ? prev.destroy + 1 : prev.destroy,
      maxLevel: Math.max(prev.maxLevel, result.level),
    }));

    // 레벨별 통계 업데이트
    setLevelStats((prev) => {
      const newStats = [...prev];
      const levelStat = newStats[currentLevel];
      newStats[currentLevel] = {
        attempt: levelStat.attempt + 1,
        successe: levelStat.successe + (result.isSuccess ? 1 : 0),
        destroy: levelStat.destroy + (result.isDestroy ? 1 : 0),
      };
      return newStats;
    });
  };

  const bulkSimulate = async (count: number) => {
    setIsSimulating(true);
    let tempCurrent = current;
    const tempStats = { ...stats };
    const tempLevelStats = [...levelStats];
    const checkPoint = 1000;

    for (let i = 0; i < count; i++) {
      if (tempCurrent >= MAX_STAR_FORCE) {
        break;
      }

      // 목표 수치 달성 체크
      if (tempCurrent >= targetLevel) {
        break;
      }

      const currentLevel = tempCurrent;
      const result = enhance(tempCurrent);
      tempStats.attempt++;
      tempLevelStats[tempCurrent].attempt++;
      tempCurrent = result.level;
      tempStats.maxLevel = Math.max(tempStats.maxLevel, tempCurrent);

      if (result.isSuccess) {
        tempStats.successe++;
        tempLevelStats[currentLevel].successe++;
      } else if (result.isDestroy) {
        tempStats.destroy++;
        tempLevelStats[currentLevel].destroy++;
      }

      if (tempCurrent >= MAX_STAR_FORCE) {
        break;
      }

      if ((i + 1) % checkPoint === 0) {
        setCurrent(tempCurrent);
        setStats({ ...tempStats });
        setLevelStats([...tempLevelStats]);

        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    }

    setCurrent(tempCurrent);
    setStats(tempStats);
    setLevelStats(tempLevelStats);
    setIsSimulating(false);
  };

  const reset = () => {
    setCurrent(0);
    setStats({ attempt: 0, destroy: 0, successe: 0, maxLevel: 0 });
    setLevelStats(
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
    levelStats,
    targetLevel,
    setTargetLevel,
    tryEnhance,
    bulkSimulate,
    reset,
    enhance,
  };
}
