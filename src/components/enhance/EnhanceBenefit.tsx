import { useAtom } from "jotai";
import { benefitAtom } from "@/store/atoms";
import { MVPGrade, MVP_GRADE_OPTION } from "@/types";

export default function EnhanceBenefit() {
  const [benefit, setBenefit] = useAtom(benefitAtom);

  const handleTogglePcRoom = () => {
    setBenefit(prev => ({ ...prev, pcRoom: !prev.pcRoom }));
  };

  const handleChangeMvpGrade = (grade: MVPGrade) => {
    setBenefit(prev => ({ ...prev, mvpGrade: grade }));
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h3 className="text-blue-400 text-sm mb-3">혜택</h3>
      
      <div className="space-y-3">
        {/* PC방 혜택 */}
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={benefit.pcRoom}
            onChange={handleTogglePcRoom}
            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
          />
          <span className="text-sm text-gray-300">
            PC방 혜택 (5%)
          </span>
        </label>

        {/* MVP 등급 */}
        <div>
          <span className="text-gray-300 text-sm block mb-2">MVP 등급</span>
          <div className="space-y-2">
            {MVP_GRADE_OPTION.map(({ grade, label, discount }) => (
              <label key={grade} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="mvpGrade"
                  value={grade}
                  checked={benefit.mvpGrade === grade}
                  onChange={() => handleChangeMvpGrade(grade)}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-gray-300">
                  {label} ({discount})
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
