import Header from "@/components/common/Header";
import HistoryControl from "@/components/history/HistoryControl";
import HistoryTable from "@/components/history/HistoryTable";

export default function StarforceHistory() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">
      {/* 헤더 */}
      <Header title="스타포스 기록 조회" />
      {/* 히스토리 설정 */}
      <HistoryControl />
      {/* 히스토리 기록 테이블 */}
      <HistoryTable />
    </div>
  );
}
