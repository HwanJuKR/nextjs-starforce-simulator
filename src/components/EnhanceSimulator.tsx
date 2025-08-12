"use client";

import useEnhance from "@/hooks/useEnhance";
import { starData } from "@/constants/starData";
import useCost from "@/hooks/useCost";

export default function EnhanceSimulator() {
  const {
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
  } = useEnhance();

  const enhanceCost = useCost();
  const currentCost = enhanceCost(equipLevel, current);

  return (
    <main>
      <h1>스타포스 강화 시뮬레이터</h1>
      
      <div>
        <div>
          <strong>장비 레벨:</strong>
          <input
            type="number"
            value={equipLevel}
            onChange={(e) => setEquipLevel(Number(e.target.value))}
            min={1}
            max={300}
          />
        </div>
        <div>
          <strong>현재 단계:</strong> {starData[current]?.starLevel || "완료"}
        </div>
        <div>
          <strong>최고 달성 단계:</strong>
          {starData[stats.maxStarLevel]?.starLevel || "0성"}
        </div>
        <div>
          <strong>총 시도:</strong> {stats.attempt.toLocaleString()}회
        </div>
        <div>
          <strong>현재 강화 시도 비용:</strong> {currentCost.toLocaleString()} 메소
        </div>
        <div>
          <strong>총 사용 비용:</strong> {stats.totalCost.toLocaleString()} 메소
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>강화 단계</th>
            <th>성공률</th>
            <th>파괴률</th>
            <th>시도 횟수</th>
            <th>실제 성공률</th>
            <th>실제 파괴률</th>
          </tr>
        </thead>
        <tbody>
          {starData.map((row, i) => {
            const StarLevelStat = starLevelStats[i] || {
              attempt: 0,
              successe: 0,
              destroy: 0,
            };
            const actualSuccessRate =
              StarLevelStat.attempt > 0
                ? ((StarLevelStat.successe / StarLevelStat.attempt) * 100).toFixed(1)
                : "0.0";
            const actualDestroyRate =
              StarLevelStat.attempt > 0
                ? ((StarLevelStat.destroy / StarLevelStat.attempt) * 100).toFixed(1)
                : "0.0";

            // 30성
            if (i === 30) {
              return (
                <tr key={row.starLevel}>
                  <td>
                    {row.starLevel}
                    {i === stats.maxStarLevel && <span>달성!</span>}
                  </td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              );
            }

            return (
              <tr key={row.starLevel}>
                <td>
                  {row.starLevel}
                  {i === stats.maxStarLevel && i > 0 && <span>최고</span>}
                </td>
                <td>{row.success}%</td>
                <td>{row.destroy}%</td>
                <td>{StarLevelStat.attempt.toLocaleString()}회</td>
                <td>{actualSuccessRate}%</td>
                <td>{actualDestroyRate}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div>
        <button
          onClick={tryEnhance}
          disabled={isSimulating || current >= starData.length - 1}
        >
          {current >= starData.length - 1 ? "30성 달성!" : "강화 시도"}
        </button>
        <button
          onClick={() => bulkSimulate(10000)}
          disabled={isSimulating || current >= starData.length - 1}
        >
          10,000번 시뮬레이션
        </button>
        <button
          onClick={() => bulkSimulate(100000)}
          disabled={isSimulating || current >= starData.length - 1}
        >
          100,000번 시뮬레이션
        </button>
        <button
          onClick={() => bulkSimulate(1000000)}
          disabled={isSimulating || current >= starData.length - 1}
        >
          1,000,000번 시뮬레이션
        </button>
        <button onClick={reset}>초기화</button>
        {isSimulating && <span>시뮬레이션 중...</span>}
      </div>

      <div>
        <label>
          목표 강화 수치:
          <input
            type="number"
            value={targetStarLevel}
            onChange={(e) => setTargetStarLevel(Number(e.target.value))}
            min={1}
            max={30}
          />
          성
        </label>
      </div>
    </main>
  );
}
