import { useQuery } from "@tanstack/react-query";
import { get } from "@/services/api/main/call";
import { MAIN_ENDPOINT } from "@/services/api/main/endpoint";

export const useFetchHistoryById = (id: string) => {
	return useQuery({
		queryFn: async () => {
			const { Kind, OK } = await get(
				MAIN_ENDPOINT.Info.HistoryByID.replace(":id", id),
			);
			if (!OK) {
				throw new Error(
					(Kind as { message: string }).message ||
						(Kind as { Message: string }).Message,
				);
			}
			return (Kind as any).data;
		},
		queryKey: ["fetch.history.by.id", id],
	}) as any;
};
