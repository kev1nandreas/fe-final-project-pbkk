import { formatReadableTime, trimLongText } from "@/lib/utils";
import { PATH } from "@/shared/path";
import type { HistoryResponse } from "@/types/api";
import UnstyledLink from "./links/UnstyledLink";

export default function History({ item }: { item: HistoryResponse }) {
	return (
		<UnstyledLink
			href={`${PATH.RESULT}/${item.id}`}
			key={item.id}
			className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6 shadow flex flex-col hover:cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
		>
			<div className="flex items-center justify-between mb-2">
				<h3 className="text-lg font-bold text-blue-700 max-w-[69%] md:max-w-[65%]">
					{trimLongText(item.query_text, 85)}
				</h3>
				<span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded min-w-[20%] text-center">
					{formatReadableTime(item.created_at)}
				</span>
			</div>
		</UnstyledLink>
	);
}
