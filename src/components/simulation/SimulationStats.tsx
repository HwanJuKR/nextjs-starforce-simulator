import { starData } from "@/constants/starData";

interface ISimulationStats {
  current: number;
  stats: {
    maxStarLevel: number;
    attempt: number;
    totalCost: number;
  };
}

export default function SimulationStats({ current, stats }: ISimulationStats) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h3 className="text-blue-400 text-sm mb-3">시뮬레이션 통계</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-300">현재 단계</span>
          <span className="text-white">
            {starData[current]?.starLevel || "0성"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">최고 달성</span>
          <span className="text-green-400">
            {starData[stats.maxStarLevel]?.starLevel || "0성"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">총 시도</span>
          <span className="text-yellow-400">
            {stats.attempt.toLocaleString()}회
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">총 비용</span>
          <span className="text-red-400">
            {stats.totalCost.toLocaleString()} 메소
          </span>
        </div>
      </div>
    </div>
  );
}
