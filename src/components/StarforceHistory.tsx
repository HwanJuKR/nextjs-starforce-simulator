import Header from "@/components/common/Header";
import HistoryControl from "@/components/history/HistoryControl";
import HistoryTable from "@/components/history/HistoryTable";

export default function StarforceHistory() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">
      <Header />
      <HistoryControl />
      <HistoryTable />
    </div>
  );
}
