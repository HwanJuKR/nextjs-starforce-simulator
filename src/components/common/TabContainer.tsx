"use client";

import { useState } from "react";
import EnhanceSimulator from "@/components/EnhanceSimulator";
import StarforceHistory from "@/components/StarforceHistory";

export default function TabContainer() {
  const [currentTab, setCurrentTab] = useState<"simulator" | "history">("simulator");

  return (
    <>
      {/* 탭 헤더 */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setCurrentTab("simulator")}
              className={`py-4 px-6 border-b-2 text-sm transition-colors cursor-pointer ${
                currentTab === "simulator"
                  ? "border-yellow-400 text-yellow-400"
                  : "border-transparent text-gray-300 hover:text-white hover:border-gray-300"
              }`}
            >
              스타포스 시뮬레이터
            </button>
            <button
              onClick={() => setCurrentTab("history")}
              className={`py-4 px-6 border-b-2 text-sm transition-colors cursor-pointer ${
                currentTab === "history"
                  ? "border-yellow-400 text-yellow-400"
                  : "border-transparent text-gray-300 hover:text-white hover:border-gray-300"
              }`}
            >
              스타포스 기록 조회
            </button>
          </div>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="p-4">
        {currentTab === "simulator" ? <EnhanceSimulator /> : <StarforceHistory />}
      </div>
    </>
  );
}
