export default function EnhanceStarLevel({ current }: { current: number }) {
  const renderStar = () => {
    const star = [];

    for (let i = 0; i < current; i++) {
      star.push(
        <span
          key={`filled-${i}`}
          className="inline-block w-4 h-4 text-yellow-400 text-center leading-4"
        >
          ★
        </span>
      );
    }

    for (let i = current; i < 30; i++) {
      star.push(
        <span
          key={`empty-${i}`}
          className="inline-block w-4 h-4 text-gray-600 text-center leading-4"
        >
          ☆
        </span>
      );
    }

    return star;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex flex-wrap justify-center gap-1 mb-4">
        {renderStar()}
      </div>

      <div className="flex items-center justify-center space-x-3 bg-gray-700 rounded-lg p-3">
        <span className="text-yellow-400 font-bold">⭐ {current}</span>
        {current < 30 && (
          <>
            <span className="text-gray-400">→</span>
            <span className="text-white font-bold">⭐ {current + 1}</span>
          </>
        )}
      </div>
    </div>
  );
}
