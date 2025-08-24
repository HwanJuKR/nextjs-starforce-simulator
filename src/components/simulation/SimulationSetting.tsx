import { useAtom } from "jotai";
import { equipLevelAtom, targetStarLevelAtom } from "@/store/atoms";

export default function SimulationSetting() {
  const [equipLevel, setEquipLevel] = useAtom(equipLevelAtom);
  const [targetStarLevel, setTargetStarLevel] = useAtom(targetStarLevelAtom);

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h3 className="text-blue-400 text-sm mb-3">장비 설정</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-gray-300 text-sm mb-1">장비 레벨</label>
          <input
            type="number"
            value={equipLevel}
            onChange={(e) => setEquipLevel(Number(e.target.value))}
            min={1}
            max={300}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm mb-1">
            목표 강화 수치
          </label>
          <input
            type="number"
            value={targetStarLevel}
            onChange={(e) => setTargetStarLevel(Number(e.target.value))}
            min={1}
            max={30}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
