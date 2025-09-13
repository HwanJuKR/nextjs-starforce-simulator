import { starData } from "@/constants/starData";
import { useAtomValue } from "jotai";
import { starLevelStatsAtom, statsAtom } from "@/store/atoms";

export default function SimulationTable() {
  const starLevelStats = useAtomValue(starLevelStatsAtom);
  const stats = useAtomValue(statsAtom);

  return (
    <div className="mt-8 bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h3 className="text-blue-400 text-lg mb-4">상세 시뮬레이션 통계</h3>
      <table className="w-full text-sm">
        <colgroup>
          <col width="15%" />
          <col width="17%" />
          <col width="17%" />
          <col width="17%" />
          <col width="17%" />
          <col width="17%" />
        </colgroup>
        <thead>
          <tr className="border-b border-gray-600">
            <th scope="col" className="text-left p-2 text-gray-300">
              강화 단계
            </th>
            <th scope="col" className="text-center p-2 text-gray-300">
              시도 횟수
            </th>
            <th scope="col" className="text-center p-2 text-gray-300">
              성공률
            </th>
            <th scope="col" className="text-center p-2 text-gray-300">
              실제 성공률
            </th>
            <th scope="col" className="text-center p-2 text-gray-300">
              파괴률
            </th>
            <th scope="col" className="text-center p-2 text-gray-300">
              실제 파괴률
            </th>
          </tr>
        </thead>
        <tbody>
          {starData.map((item, index) => {
            const StarLevelStat = starLevelStats[index] || {
              attempt: 0,
              success: 0,
              destroy: 0,
            };
            const realSuccessRate =
              StarLevelStat.attempt > 0
                ? (
                    (StarLevelStat.success / StarLevelStat.attempt) *
                    100
                  ).toFixed(1)
                : "0.0";
            const realDestroyRate =
              StarLevelStat.attempt > 0
                ? (
                    (StarLevelStat.destroy / StarLevelStat.attempt) *
                    100
                  ).toFixed(1)
                : "0.0";

            // 30성
            if (index === 30) {
              return (
                <tr
                  key={item.starLevel}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="p-2 text-yellow-400 font-bold">
                    {item.starLevel}성
                    {index === stats.maxStarLevel && (
                      <span className="ml-2 text-green-400">달성!</span>
                    )}
                  </td>
                  <td className="p-2 text-center text-gray-400">-</td>
                  <td className="p-2 text-center text-gray-400">-</td>
                  <td className="p-2 text-center text-gray-400">-</td>
                  <td className="p-2 text-center text-gray-400">-</td>
                  <td className="p-2 text-center text-gray-400">-</td>
                </tr>
              );
            }

            return (
              <tr
                key={item.starLevel}
                className="border-b border-gray-700 hover:bg-gray-700"
              >
                <td className="p-2 text-yellow-400 font-bold">
                  {item.starLevel}성
                  {index === stats.maxStarLevel && index > 0 && (
                    <span className="ml-2 text-green-400">최고</span>
                  )}
                </td>
                <td className="p-2 text-center text-white">
                  {StarLevelStat.attempt.toLocaleString()}회
                </td>
                <td className="p-2 text-center text-green-400">
                  {item.success}%
                </td>
                <td className="p-2 text-center text-blue-400">
                  {realSuccessRate}%
                </td>
                <td className="p-2 text-center text-red-400">
                  {item.destroy}%
                </td>
                <td className="p-2 text-center text-orange-400">
                  {realDestroyRate}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
