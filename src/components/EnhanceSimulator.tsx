"use client";

import Header from "@/components/common/Header";
import EnhanceChance from "@/components/enhance/EnhanceChance";
import EnhanceControl from "@/components/enhance/EnhanceControl";
import EnhanceCost from "@/components/enhance/EnhanceCost";
import EnhanceEvent from "@/components/enhance/EnhanceEvent";
import EnhanceItem from "@/components/enhance/EnhanceItem";
import EnhanceStarLevel from "@/components/enhance/EnhanceStarLevel";
import SimulationChart from "@/components/simulation/SimulationChart";
import SimulationControl from "@/components/simulation/SimulationControl";
import SimulationSetting from "@/components/simulation/SimulationSetting";
import SimulationStats from "@/components/simulation/SimulationStats";
import SimulationTable from "@/components/simulation/SimulationTable";
import useCost from "@/hooks/useCost";
import useEnhance from "@/hooks/useEnhance";

export default function EnhanceSimulator() {
  const {
    current,
    isSimulating,
    stats,
    starLevelStats,
    targetStarLevel,
    setTargetStarLevel,
    equipLevel,
    setEquipLevel,
    tryEnhance,
    bulkSimulate,
    reset,
  } = useEnhance();

  const enhanceCost = useCost();
  const currentCost = enhanceCost(equipLevel, current);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 스타포스 강화 영역 */}
        <div className="lg:col-span-2 space-y-4">
          {/* 헤더 */}
          <Header />
          {/* 장비 아이템 영역 */}
          <EnhanceItem />
          {/* 별 표시 영역 */}
          <EnhanceStarLevel current={current} />
          {/* 확률 영역 */}
          <EnhanceChance current={current} />
          {/* 사용 재화 영역 */}
          <EnhanceCost currentCost={currentCost} />
          {/* todo: 강화 이벤트 영역 */}
          <EnhanceEvent />
          {/* 강화하기 영역 */}
          <EnhanceControl
            current={current}
            isSimulating={isSimulating}
            tryEnhance={tryEnhance}
          />
        </div>

        {/* 통계 및 차트 영역 */}
        <div className="space-y-4">
          {/* 장비 설정 */}
          <SimulationSetting
            equipLevel={equipLevel}
            setEquipLevel={setEquipLevel}
            targetStarLevel={targetStarLevel}
            setTargetStarLevel={setTargetStarLevel}
          />
          {/* 시뮬레이션 통계 */}
          <SimulationStats current={current} stats={stats} />
          {/* 시뮬레이션 컨트롤 */}
          <SimulationControl
            current={current}
            isSimulating={isSimulating}
            bulkSimulate={bulkSimulate}
            reset={reset}
          />
          {/* 차트 영역 */}
          <SimulationChart starLevelStats={starLevelStats} stats={stats} isSimulating={isSimulating} />
        </div>
      </div>

      {/* 상세 시뮬레이션 통계 */}
      <div className="max-w-7xl mx-auto">
        <SimulationTable starLevelStats={starLevelStats} stats={stats} />
      </div>
    </div>
  );
}
