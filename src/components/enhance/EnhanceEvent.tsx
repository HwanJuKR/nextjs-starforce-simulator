"use client";

import { useAtomValue } from "jotai";
import { isSimulatingAtom } from "@/store/atoms";
import useEvent from "@/hooks/useEvent";

export default function EnhanceEvent() {
  const { event, toggleEvent } = useEvent();
  const isSimulating = useAtomValue(isSimulatingAtom);

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h3 className="text-blue-400 text-sm mb-3">강화 이벤트</h3>
      <div className="space-y-3">
        <label className={`flex items-center space-x-3 ${isSimulating ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
          <input
            type="checkbox"
            checked={event.doubleEnhance}
            onChange={() => toggleEvent('doubleEnhance')}
            disabled={isSimulating}
            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 disabled:cursor-not-allowed"
          />
          <span className="text-sm text-gray-300">
            10성 이하에서는 강화 시 1+1
          </span>
        </label>
        <label className={`flex items-center space-x-3 ${isSimulating ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
          <input
            type="checkbox"
            checked={event.costDiscount}
            onChange={() => toggleEvent('costDiscount')}
            disabled={isSimulating}
            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 disabled:cursor-not-allowed"
          />
          <span className="text-sm text-gray-300">비용 30% 할인</span>
        </label>
        <label className={`flex items-center space-x-3 ${isSimulating ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
          <input
            type="checkbox"
            checked={event.perfectSuccess}
            onChange={() => toggleEvent('perfectSuccess')}
            disabled={isSimulating}
            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 disabled:cursor-not-allowed"
          />
          <span className="text-sm text-gray-300">
            5, 10, 15성에서는 강화시 성공확률 100%
          </span>
        </label>
        <label className={`flex items-center space-x-3 ${isSimulating ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
          <input
            type="checkbox"
            checked={event.reducedDestroy}
            onChange={() => toggleEvent('reducedDestroy')}
            disabled={isSimulating}
            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 disabled:cursor-not-allowed"
          />
          <span className="text-sm text-gray-300">
            21성 이하에서는 파괴 확률 30% 감소
          </span>
        </label>
        <label className={`flex items-center space-x-3 ${isSimulating ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
          <input
            type="checkbox"
            checked={event.shiningStarforce}
            onChange={() => toggleEvent('shiningStarforce')}
            disabled={isSimulating}
            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 disabled:cursor-not-allowed"
          />
          <span className="text-sm text-gray-300">샤이닝 스타포스</span>
        </label>
      </div>
    </div>
  );
}
