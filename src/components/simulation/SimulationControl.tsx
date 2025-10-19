"use client";

import { starData } from "@/constants/starData";
import { useAtomValue } from "jotai";
import { currentStarLevelAtom, isSimulatingAtom } from "@/store/atoms";
import useEnhance from "@/hooks/useEnhance";

export default function SimulationControl() {
  const currentStarLevel = useAtomValue(currentStarLevelAtom);
  const isSimulating = useAtomValue(isSimulatingAtom);
  const { bulkSimulate, reset } = useEnhance();

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h3 className="text-blue-400 text-sm mb-3">시뮬레이션</h3>
      <div className="space-y-2">
        <button
          data-testid="btn-bulk10k"
          onClick={() => bulkSimulate(10000)}
          disabled={isSimulating || currentStarLevel >= starData.length - 1}
          className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-[0.8rem] px-[1.6rem] rounded text-sm transition-colors"
        >
          10,000번 시뮬레이션
        </button>
        <button
          data-testid="btn-bulk100k"
          onClick={() => bulkSimulate(100000)}
          disabled={isSimulating || currentStarLevel >= starData.length - 1}
          className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-[0.8rem] px-[1.6rem] rounded text-sm transition-colors"
        >
          100,000번 시뮬레이션
        </button>
        <button
          data-testid="btn-bulk1m"
          onClick={() => bulkSimulate(1000000)}
          disabled={isSimulating || currentStarLevel >= starData.length - 1}
          className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-[0.8rem] px-[1.6rem] rounded text-sm transition-colors"
        >
          1,000,000번 시뮬레이션
        </button>
        <button
          data-testid="btn-bulk-reset"
          onClick={reset}
          disabled={isSimulating}
          className="w-full cursor-pointer bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-[0.8rem] px-[1.6rem] rounded text-sm transition-colors"
        >
          초기화
        </button>
        {isSimulating && (
          <div className="text-center text-yellow-400 text-sm">
            시뮬레이션 중
            <span className="animate-pulse">...</span>
          </div>
        )}
      </div>
    </div>
  );
}
