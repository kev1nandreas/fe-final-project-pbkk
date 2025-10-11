interface Reference {
  id: number;
  title: string;
  author: string;
  year: number;
  summary: string;
}

export default function References(
    { ref }: { ref: Reference }
) {
  return (
    <div
      key={ref.id}
      className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6 shadow flex flex-col"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-blue-700">{ref.title}</h3>
        <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">
          {ref.year}
        </span>
      </div>
      <p className="text-sm text-gray-700 mb-2">
        <span className="font-semibold">Author:</span> {ref.author}
      </p>
      <p className="text-gray-600 text-sm">{ref.summary}</p>
    </div>
  );
}
