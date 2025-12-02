import { useQuery } from "@tanstack/react-query";
import { typecastReferencesResponse } from "@/types/api";
import { get } from "../main/call";
import { MAIN_ENDPOINT } from "../main/endpoint";

export const useFetchHistory = (
	_onSuccess?: () => void,
	_onError?: () => void,
) => {
	return useQuery({
		queryFn: async () => {
			const { Kind, OK } = await get(MAIN_ENDPOINT.Info.History);
			if (!OK) {
				throw new Error(
					(Kind as { message: string }).message ||
						(Kind as { Message: string }).Message,
				);
			}
			return (Kind as any).data;
		},
		queryKey: ["fetch.history"],
	}) as any;
};

export const useFetchReferences = (
	_onSuccess?: () => void,
	_onError?: () => void,
) => {
	return useQuery({
		queryFn: async () => {
			const { Kind, OK } = await get(MAIN_ENDPOINT.Info.Embeddings);
			if (!OK) {
				throw new Error(
					(Kind as { message: string }).message ||
						(Kind as { Message: string }).Message,
				);
			}
			return typecastReferencesResponse((Kind as any).data);
		},
		queryKey: ["fetch.references"],
	}) as any;
};
