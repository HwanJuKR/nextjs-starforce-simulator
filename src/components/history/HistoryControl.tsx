export default function StarforceHistoryControl() {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h3 className="text-blue-400 text-sm mb-3">조회 설정</h3>

      <div className="mb-4">
        <label className="block text-sm text-gray-300 mb-2">
          API 키 <span className="text-red-400">*</span>
        </label>
        <input
          type="password"
          placeholder="Nexon Open API 키를 입력하세요"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-transparent"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="space-y-2">
          <label className="block text-sm text-gray-300">
            조회 갯수 <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            min="10"
            max="1000"
            defaultValue={100}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-transparent"
          />
          <p className="text-xs text-gray-400">최소 10, 최대 1000</p>
        </div>
        <div className="space-y-2">
          <label className="block text-sm text-gray-300">검색 방식</label>
          <select
            defaultValue="date"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:border-transparent"
          >
            <option value="date">날짜로 검색</option>
            <option value="cursor">커서로 검색</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm text-gray-300">
            조회 기준일 (KST) <span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            min="2023-12-27"
            max={new Date().toISOString().split("T")[0]}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:border-transparent"
          />
          <p className="text-xs text-gray-400">
            2023년 12월 27일부터 조회 가능
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-md transition-colors cursor-pointer">
          조회하기
        </button>
        <button className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors cursor-pointer">
          초기화
        </button>
      </div>
    </div>
  );
}
