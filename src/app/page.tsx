import TabHeader from "@/components/common/TabHeader";
import EnhanceSimulator from "@/components/EnhanceSimulator";

export default function Home() {
  return (
    <>
      <TabHeader />
      <div className="p-4">
        <EnhanceSimulator />
      </div>
    </>
  );
}
