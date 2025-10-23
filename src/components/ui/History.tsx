import { formatReadableTime, trimLongText } from "@/lib/utils";
import { HistoryResponse } from "@/types/response";
import { useRouter } from "next/navigation";

export default function History({ item }: { item: HistoryResponse }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/result/${item.id}`)}
      key={item.id}
      className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6 shadow flex flex-col hover:cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-blue-700">{trimLongText(item.query_text, 100)}</h3>
        <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">
          {formatReadableTime(item.created_at)}
        </span>
      </div>
    </div>
  );
}
