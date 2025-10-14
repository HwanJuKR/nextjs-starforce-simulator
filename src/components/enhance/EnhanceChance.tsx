"use client";

import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { currentStarLevelAtom, eventAtom, preventDestroyAtom, starCatchAtom } from "@/store/atoms";
import { PREVENT_DESTROY_MIN_LEVEL, PREVENT_DESTROY_MAX_LEVEL } from "@/constants/starData";
import { calculateEnhanceChance } from "@/hooks/useEnhance";

export default function EnhanceChance() {
  const currentStarLevel = useAtomValue(currentStarLevelAtom);
  const event = useAtomValue(eventAtom);
  const preventDestroy = useAtomValue(preventDestroyAtom);
  const starCatch = useAtomValue(starCatchAtom);
  const chance = useMemo(() => 
    calculateEnhanceChance(currentStarLevel, event, preventDestroy, starCatch)
  , [currentStarLevel, event, preventDestroy, starCatch]);
  const isPreventDestroy = preventDestroy && currentStarLevel >= PREVENT_DESTROY_MIN_LEVEL && currentStarLevel <= PREVENT_DESTROY_MAX_LEVEL;

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h3 className="text-blue-400 text-sm mb-3">확률</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-300">성공</span>
          <span className={`${chance.isPerfectSuccess ? 'text-purple-400 font-bold' : starCatch ? 'text-blue-400' : 'text-green-400'}`}>
            {Math.round(chance.success)}%
            {chance.isPerfectSuccess && ' (100%)'}
            {starCatch && !chance.isPerfectSuccess && ' (스타캐치)'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">실패</span>
          <span className="text-yellow-400">
            {Math.round(chance.fail)}%
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">파괴</span>
          <span className={`${
            isPreventDestroy 
              ? 'text-green-400 font-bold' 
              : chance.destroyReduction 
                ? 'text-orange-400' 
                : 'text-red-400'
          }`}>
            {Math.round(chance.destroy)}%
            {isPreventDestroy && ' (파괴 방지)'}
            {chance.destroyReduction && !isPreventDestroy && ` (-30%)`}
          </span>
        </div>
      </div>
    </div>
  );
}
