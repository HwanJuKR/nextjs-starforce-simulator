import { useAtomValue } from "jotai";
import { currentStarLevelAtom, eventAtom } from "@/store/atoms";
import { calculateEnhanceChance } from "@/hooks/useEnhance";

export default function EnhanceChance() {
  const currentStarLevel = useAtomValue(currentStarLevelAtom);
  const event = useAtomValue(eventAtom);
  const chance = calculateEnhanceChance(currentStarLevel, event);

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h3 className="text-blue-400 text-sm mb-3">확률</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-300">성공</span>
          <span className={`${chance.isPerfectSuccess ? 'text-purple-400 font-bold' : 'text-green-400'}`}>
            {Math.round(chance.success)}%
            {chance.isPerfectSuccess && ' (100%)'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">실패</span>
          <span className="text-yellow-400">
            {Math.round(chance.fail)}%
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">파괴</span>
          <span className={`${chance.destroyReduction ? 'text-orange-400' : 'text-red-400'}`}>
            {Math.round(chance.destroy)}%
            {chance.destroyReduction && ` (-30%)`}
          </span>
        </div>
      </div>
    </div>
  );
}
