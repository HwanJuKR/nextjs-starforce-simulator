export default function Header({ title }: { title: string}) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h1 className="text-yellow-400 text-lg font-bold mb-2">
        {title}
      </h1>
    </div>
  );
}
