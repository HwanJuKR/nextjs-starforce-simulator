export default function HistoryTable() {
  return (
    <div className="mt-8 bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h3 className="text-blue-400 text-lg mb-4">스타포스 기록 (0건)</h3>
      <table className="w-full text-sm">
        <colgroup>
          <col width="15%" />
          <col width="17%" />
          <col width="17%" />
          <col width="17%" />
          <col width="17%" />
          <col width="17%" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className="text-left p-2 text-gray-300">
              일시
            </th>
            <th scope="col" className="text-center p-2 text-gray-300">
              캐릭터
            </th>
            <th scope="col" className="text-center p-2 text-gray-300">
              장비
            </th>
            <th scope="col" className="text-center p-2 text-gray-300">
              스타포스
            </th>
            <th scope="col" className="text-center p-2 text-gray-300">
              결과
            </th>
            <th scope="col" className="text-center p-2 text-gray-300">
              옵션
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700 hover:bg-gray-700">
            <td className="p-2">2025-09-13 22:30:00</td>
            <td className="p-2 text-center">캐릭터</td>
            <td className="p-2 text-center">아이템</td>
            <td className="p-2 text-center">
              <span>16</span>
              <span>→</span>
              <span>17</span>
            </td>
            <td className="p-2 text-center">성공</td>
            <td className="p-2 text-center">비고</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
