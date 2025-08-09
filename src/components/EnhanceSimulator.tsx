"use client";

import useEnhance from "@/hooks/useEnhance";
import { starData } from "@/constants/starData";

export default function EnhanceSimulator() {
  const {
    current,
    isSimulating,
    stats,
    levelStats,
    targetLevel,
    setTargetLevel,
    tryEnhance,
    bulkSimulate,
    reset,
  } = useEnhance();

  return (
    <main>
      <h1>스타포스 강화 시뮬레이터</h1>
      <div>
        <div>
          <strong>현재 단계:</strong> {starData[current]?.level || "완료"}
        </div>
        <div>
          <strong>최고 달성 단계:</strong>
          {starData[stats.maxLevel]?.level || "0성"}
        </div>
        <div>
          <strong>총 시도:</strong> {stats.attempt.toLocaleString()}회
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
            const levelStat = levelStats[i] || {
              attempt: 0,
              successe: 0,
              destroy: 0,
            };
            const actualSuccessRate =
              levelStat.attempt > 0
                ? ((levelStat.successe / levelStat.attempt) * 100).toFixed(1)
                : "0.0";
            const actualDestroyRate =
              levelStat.attempt > 0
                ? ((levelStat.destroy / levelStat.attempt) * 100).toFixed(1)
                : "0.0";

            // 30성
            if (i === 30) {
              return (
                <tr key={row.level}>
                  <td>
                    {row.level}
                    {i === stats.maxLevel && <span>달성!</span>}
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
              <tr key={row.level}>
                <td>
                  {row.level}
                  {i === stats.maxLevel && i > 0 && <span>최고</span>}
                </td>
                <td>{row.success}%</td>
                <td>{row.destroy}%</td>
                <td>{levelStat.attempt.toLocaleString()}회</td>
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
            value={targetLevel}
            onChange={(e) => setTargetLevel(Number(e.target.value))}
            min={1}
            max={30}
          />
          성
        </label>
      </div>
    </main>
  );
}
