interface HistoryItem {
  id: number;
  title: string;
  usedAt: string;
}

export default function History({ item }: { item: HistoryItem }) {
  return (
    <div
      key={item.id}
      className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6 shadow flex flex-col"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-blue-700">{item.title}</h3>
        <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">
          {item.usedAt}
        </span>
      </div>
    </div>
  );
}
