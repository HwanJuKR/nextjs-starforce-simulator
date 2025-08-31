import { useAtom, useAtomValue } from "jotai";
import { currentStarLevelAtom, isSimulatingAtom, preventDestroyAtom, starCatchAtom } from "@/store/atoms";
import useEnhance from "@/hooks/useEnhance";

export default function EnhanceControl() {
  const currentStarLevel = useAtomValue(currentStarLevelAtom);
  const isSimulating = useAtomValue(isSimulatingAtom);
  const [preventDestroy, setPreventDestroy] = useAtom(preventDestroyAtom);
  const [starCatch, setStarCatch] = useAtom(starCatchAtom);
  const { tryEnhance } = useEnhance();

  // 15성부터 17성까지만 파괴 방지 옵션 활성화
  const isPreventDestroy = currentStarLevel >= 15 && currentStarLevel <= 17;

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setStarCatch(!starCatch)}
          className={`flex items-center space-x-2 rounded-lg p-2 transition-colors ${
            starCatch
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          <span className={starCatch ? "text-green-400" : "text-gray-400"}>
            {starCatch ? "✓" : "✕"}
          </span>
          <span className={`text-sm ${starCatch ? "text-white" : "text-gray-400"}`}>
            스타캐치
          </span>
        </button>
        <button
          onClick={() => setPreventDestroy(!preventDestroy)}
          disabled={!isPreventDestroy}
          className={`flex items-center space-x-2 rounded-lg p-2 transition-colors ${
            isPreventDestroy
              ? preventDestroy
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-700 hover:bg-gray-600"
              : "bg-gray-700 opacity-50 cursor-not-allowed"
          }`}
        >
          <span className={preventDestroy && isPreventDestroy ? "text-green-400" : "text-gray-400"}>
            {preventDestroy && isPreventDestroy ? "✓" : "✕"}
          </span>
          <span className={`text-sm ${preventDestroy && isPreventDestroy ? "text-white" : "text-gray-400"}`}>
            파괴 방지
          </span>
        </button>
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
