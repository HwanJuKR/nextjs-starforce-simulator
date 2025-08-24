import { useAtomValue } from "jotai";
import { currentStarLevelAtom, isSimulatingAtom } from "@/store/atoms";
import useEnhance from "@/hooks/useEnhance";

export default function EnhanceControl() {
  const currentStarLevel = useAtomValue(currentStarLevelAtom);
  const isSimulating = useAtomValue(isSimulatingAtom);
  const { tryEnhance } = useEnhance();

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex space-x-2 mb-4">
        <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-2">
          <span className="text-green-400">✓</span>
          <span className="text-sm">스타캐치 해제</span>
        </div>
        <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-2">
          <span className="text-gray-400">✕</span>
          <span className="text-sm text-gray-400">파괴 방지</span>
        </div>
      </div>

      <button
        onClick={tryEnhance}
        disabled={isSimulating || currentStarLevel === 30}
        className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        {currentStarLevel === 30 ? "30성 달성!" : "강화하기"}
      </button>
    </div>
  );
}
