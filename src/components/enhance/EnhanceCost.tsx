"use client";

import { useAtomValue } from "jotai";
import { currentCostAtom } from "@/store/atoms";

export default function EnhanceCost() {
  const currentCost = useAtomValue(currentCostAtom);

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h3 className="text-blue-400 text-sm mb-3">강화 비용</h3>
      <div className="flex items-center space-x-2" data-testid="enhance-cost">
        <span className="text-yellow-400">💰</span>
        <span className="text-white">
          {currentCost.toLocaleString()} 메소
        </span>
      </div>
    </div>
  );
}
