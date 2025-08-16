import { starData } from "@/constants/starData";

export default function EnhanceChance({ current }: { current: number }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h3 className="text-blue-400 text-sm mb-3">확률</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-300">성공</span>
          <span className="text-green-400">
            {current < starData.length ? starData[current]?.success : 0}%
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">실패</span>
          <span className="text-yellow-400">
            {current < starData.length ? starData[current]?.fail : 0}%
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">파괴</span>
          <span className="text-red-400">
            {current < starData.length ? starData[current]?.destroy : 0}%
          </span>
        </div>
      </div>
    </div>
  );
}
