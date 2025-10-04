import TabHeader from "@/components/common/TabHeader";
import StarforceHistory from "@/components/StarforceHistory";

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <TabHeader />
      <div className="p-4">
        <StarforceHistory />
      </div>
    </div>
  );
}

