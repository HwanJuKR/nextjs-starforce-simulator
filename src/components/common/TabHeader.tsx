"use client";

import { useRouter, usePathname } from "next/navigation";

export default function TabHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const currentTab = pathname === "/history" ? "history" : "simulator";

  const handleTabChange = (tab: "simulator" | "history") => {
    router.push(tab === "simulator" ? "/" : "/history");
  };

  return (
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-8">
          <button
            onClick={() => handleTabChange("simulator")}
            className={`py-4 px-6 border-b-2 text-sm transition-colors cursor-pointer ${
              currentTab === "simulator"
                ? "border-yellow-400 text-yellow-400"
                : "border-transparent text-gray-300 hover:text-white hover:border-gray-300"
            }`}
          >
            스타포스 시뮬레이터
          </button>
          <button
            onClick={() => handleTabChange("history")}
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
  );
}
