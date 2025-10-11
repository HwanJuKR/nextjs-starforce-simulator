import TabHeader from "@/components/common/TabHeader";
import StarforceHistory from "@/components/StarforceHistory";

export default function HistoryPage() {
  return (
    <>
      <TabHeader />
      <div className="p-4">
        <StarforceHistory />
      </div>
    </>
  );
}
