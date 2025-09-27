"use client";

import { useHistory } from "@/hooks/useHistory";
import { historyApiKeyAtom, historyCountAtom, historyDateAtom } from "@/store/atoms";
import { IHistoryItem } from "@/types";
import { useAtomValue } from "jotai";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleString("ko-KR");
};

const getResultColor = (result: string) => {
  switch (result) {
    case "성공":
      return "text-green-400";
    case "실패":
      return "text-red-400";
    case "파괴":
      return "text-red-500";
    default:
      return "text-gray-300";
  }
};

const getOption = (item: IHistoryItem) => {
  const options: string[] = [];

  if (item.starcatch_result === "성공") options.push("스타 캐치");
  if (item.destroy_defence === "적용") options.push("파괴 방지");
  if (item.chance_time === "적용") options.push("찬스 타임");
  if (item.protect_shield === "적용") options.push("프로텍트 실드");
  if (item.event_field_flag === "적용") options.push("파괴 방지 필드 이벤트");

  return options.length > 0 ? options.join(", ") : "-";
};

export default function HistoryTable() {
  const apiKey = useAtomValue(historyApiKeyAtom);
  const count = useAtomValue(historyCountAtom);
  const date = useAtomValue(historyDateAtom);

  const { data, isLoading } = useHistory({
    apiKey,
    count,
    date,
  });

  const historyData = data?.starforce_history || [];

  return (
    <div className="mt-8 bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h3 className="text-blue-400 text-lg mb-4">
        스타포스 기록 ({isLoading ? "조회 중..." : `${historyData.length}건`})
      </h3>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
          <span className="ml-2 text-gray-400">데이터를 불러오는 중...</span>
        </div>
      ) : historyData.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          조회된 스타포스 기록이 없습니다.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <caption className="blind">스타포스 기록</caption>
            <colgroup>
              <col width="20%" />
              <col width="15%" />
              <col width="20%" />
              <col width="15%" />
              <col width="15%" />
              <col width="15%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className="text-left p-2 text-gray-300">
                  일시
                </th>
                <th scope="col" className="text-center p-2 text-gray-300">
                  캐릭터
                </th>
                <th scope="col" className="text-center p-2 text-gray-300">
                  장비
                </th>
                <th scope="col" className="text-center p-2 text-gray-300">
                  스타포스
                </th>
                <th scope="col" className="text-center p-2 text-gray-300">
                  결과
                </th>
                <th scope="col" className="text-center p-2 text-gray-300">
                  옵션
                </th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="p-2">
                    {formatDate(item.date_create)}
                  </td>
                  <td className="p-2 text-center">
                    <div className="truncate" title={item.character_name}>
                      {item.character_name}
                    </div>
                    <div
                      className="text-xs text-gray-400 truncate"
                      title={item.world_name}
                    >
                      {item.world_name}
                    </div>
                  </td>
                  <td className="p-2 text-center">
                    <div className="truncate" title={item.target_item}>
                      {item.target_item}
                    </div>
                    {item.superior_item_flag === "적용" && (
                      <div className="text-xs text-purple-400">슈페리얼</div>
                    )}
                  </td>
                  <td className="p-2 text-center">
                    <span className="text-gray-400">
                      {item.before_starforce_count}
                    </span>
                    <span className="mx-1">→</span>
                    <span className="text-yellow-400">
                      {item.after_starforce_count}
                    </span>
                  </td>
                  <td
                    className={`p-2 text-center ${getResultColor(
                      item.item_upgrade_result
                    )}`}
                  >
                    {item.item_upgrade_result}
                  </td>
                  <td className="p-2 text-center">
                    <div className="truncate" title={getOption(item)}>
                      {getOption(item)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
