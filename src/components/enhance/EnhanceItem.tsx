export default function EnhanceItem() {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24 bg-gray-700 border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-xs">장비 이미지</span>
        </div>

        <div className="bg-gray-700 rounded-full px-6 py-2">
          <span className="text-white text-sm">장비 이름</span>
        </div>
      </div>
    </div>
  );
}
