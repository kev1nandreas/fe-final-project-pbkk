interface ReferenceCard {
  id: number;
  title: string;
  author: string;
  year: number;
  summary: string;
}

export default function References({ reference }: { reference: ReferenceCard }) {
  return (
    <div
      className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6 shadow flex flex-col"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-blue-700">{reference.title}</h3>
        <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">
          {reference.year}
        </span>
      </div>
      <p className="text-sm text-gray-700 mb-2">
        <span className="font-semibold">Author:</span> {reference.author}
      </p>
      <p className="text-gray-600 text-sm">{reference.summary}</p>
    </div>
  );
}
