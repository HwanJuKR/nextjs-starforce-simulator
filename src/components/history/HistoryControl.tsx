"use client";

import {
  DEFAULT_QUERY_COUNT,
  MAX_QUERY_COUNT,
  MIN_QUERY_COUNT,
  MIN_QUERY_DATE,
} from "@/constants/starData";
import { useHistory } from "@/hooks/useHistory";
import { historyApiKeyAtom, historyCountAtom, historyDateAtom } from "@/store/atoms";
import { useAtom } from "jotai";

export default function HistoryControl() {
  const [apiKey, setApiKey] = useAtom(historyApiKeyAtom);
  const [count, setCount] = useAtom(historyCountAtom);
  const [date, setDate] = useAtom(historyDateAtom);

  const { data, error, isLoading, isError, isSuccess, refetch, resetData } = useHistory({
    apiKey,
    count,
    date,
  });

  const handleSubmit = () => {
    refetch();
  };

  const handleReset = () => {
    setApiKey("");
    setCount(DEFAULT_QUERY_COUNT);
    setDate(new Date().toISOString().split("T")[0]);
    resetData();
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h3 className="text-blue-400 text-sm mb-3">조회 설정</h3>

      {isError && error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-md">
          <p className="text-red-400 text-sm">{error.error.name}</p>
          <p className="text-red-300 text-sm">{error.error.message}</p>
        </div>
      )}

      {isSuccess && data && (
        <div className="mb-4 p-3 bg-green-900/50 border border-green-700 rounded-md">
          <p className="text-green-400 text-sm">
            조회 완료: {data.count}건의 기록을 찾았습니다.
          </p>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm text-gray-300 mb-2">
          API 키 <span className="text-red-400">*</span>
        </label>
        <input
          type="password"
          placeholder="Nexon Open API 키를 입력하세요"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <label className="block text-sm text-gray-300">
            조회 갯수 <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            min={MIN_QUERY_COUNT}
            max={MAX_QUERY_COUNT}
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          />
          <p className="text-xs text-gray-400">
            최소 {MIN_QUERY_COUNT}, 최대 {MAX_QUERY_COUNT}
          </p>
        </div>
        <div className="space-y-2">
          <label className="block text-sm text-gray-300">
            조회 기준일 (KST) <span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            min={MIN_QUERY_DATE}
            max={new Date().toISOString().split("T")[0]}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:border-blue-500 focus:outline-none"
          />
          <p className="text-xs text-gray-400">
            2023년 12월 27일부터 조회 가능
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-600 disabled:cursor-not-allowed text-black rounded-md transition-colors cursor-pointer"
        >
          {isLoading ? "조회 중..." : "조회하기"}
        </button>
        <button
          onClick={handleReset}
          disabled={isLoading}
          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-md transition-colors cursor-pointer"
        >
          초기화
        </button>
      </div>
    </div>
  );
}
