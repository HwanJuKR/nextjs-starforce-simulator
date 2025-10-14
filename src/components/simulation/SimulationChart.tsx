"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { starData } from "@/constants/starData";
import { useAtomValue } from "jotai";
import { starLevelStatsAtom, statsAtom, isSimulatingAtom } from "@/store/atoms";
import { ChartType } from "@/types";

export default function SimulationChart() {
  const starLevelStats = useAtomValue(starLevelStatsAtom);
  const stats = useAtomValue(statsAtom);
  const isSimulating = useAtomValue(isSimulatingAtom);
  const [currentChart, setCurrentChart] = useState<ChartType>("attempt");

  // 레벨 별 시도 횟수 (12성 부터)
  const attemptData = useMemo(
    () =>
      starLevelStats
        .map((stat, index) => {
          if (stat.attempt === 0 || index < 12) return null;

          return {
            starLevel: `${index}성`,
            시도: stat.attempt,
            성공: stat.success,
            실패: stat.attempt - stat.success - stat.destroy,
            파괴: stat.destroy,
          };
        })
        .filter(Boolean),
    [starLevelStats]
  );

  // 성공률 비교 (12성 부터)
  const successRateData = useMemo(
    () =>
      starLevelStats
        .map((stat, index) => {
          if (stat.attempt === 0 || index < 12) return null;

          const successRate = starData[index]?.success || 0;
          const realSuccessRate = (stat.success / stat.attempt) * 100 || 0;

          return {
            starLevel: `${index}성`,
            성공률: successRate,
            실제성공률: realSuccessRate,
            시도: stat.attempt,
          };
        })
        .filter(Boolean),
    [starLevelStats]
  );

  const renderChart = () => {
    if (isSimulating) {
      return (
        <div className="h-full bg-gray-700 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-sm">시뮬레이션 진행 중...</span>
        </div>
      );
    }

    switch (currentChart) {
      case "attempt":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={attemptData}
              margin={{ top: 10, right: 5, left: 5, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="starLevel"
                stroke="#9ca3af"
                fontSize={10}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={45}
                tick={{ fontSize: 10 }}
              />
              <YAxis
                stroke="#9ca3af"
                fontSize={10}
                width={40}
                tick={{ fontSize: 10 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "6px",
                  color: "#f3f4f6",
                }}
              />
              <Legend iconSize={10} />
              <Bar dataKey="성공" stackId="a" fill="#10b981" />
              <Bar dataKey="실패" stackId="a" fill="#f59e0b" />
              <Bar dataKey="파괴" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "successRate":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={successRateData}
              margin={{ top: 10, right: 5, left: 5, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="starLevel"
                stroke="#9ca3af"
                fontSize={10}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={45}
                tick={{ fontSize: 10 }}
              />
              <YAxis
                stroke="#9ca3af"
                fontSize={10}
                domain={[0, 100]}
                width={40}
                tick={{ fontSize: 10 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "6px",
                  color: "#f3f4f6",
                }}
                formatter={(value: number) => [`${value.toFixed(1)}%`, ""]}
              />
              <Legend iconSize={10} />
              <Line
                type="monotone"
                dataKey="성공률"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="실제성공률"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-blue-400 text-sm">통계 차트</h3>
        <div className="flex gap-1">
          <button
            onClick={() => !isSimulating && setCurrentChart("attempt")}
            disabled={isSimulating}
            className={`px-2 py-1 text-xs rounded ${
              isSimulating
                ? "bg-gray-600 text-gray-500 cursor-not-allowed"
                : currentChart === "attempt"
                ? "bg-blue-600 text-white cursor-pointer"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600 cursor-pointer"
            }`}
          >
            시도
          </button>
          <button
            onClick={() => !isSimulating && setCurrentChart("successRate")}
            disabled={isSimulating}
            className={`px-2 py-1 text-xs rounded ${
              isSimulating
                ? "bg-gray-600 text-gray-500 cursor-not-allowed"
                : currentChart === "successRate"
                ? "bg-blue-600 text-white cursor-pointer"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600 cursor-pointer"
            }`}
          >
            성공률
          </button>
        </div>
      </div>

      <div className="h-[300px]">
        {stats.attempt > 0 ? (
          renderChart()
        ) : (
          <div className="h-full bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-sm">
              시뮬레이션을 실행하면 차트가 표시됩니다
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
