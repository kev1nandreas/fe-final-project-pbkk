/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import { typecastReferencesResponse } from "@/types/api";
import { get, post } from "../main/call";
import { MAIN_ENDPOINT } from "../main/endpoint";
// import { LLMRequestData } from "@/types/request";
// import { typecastHistoryByIdResponse } from "@/types/response";

// export const useSearchReferences = ({
//   onSuccess,
//   onError,
// }: {
//   onSuccess: (data: any) => void;
//   onError: (error: any) => void;
// }) => {
//   return useMutation({
//     mutationFn: async (body: LLMRequestData) => {
//       const { Kind, OK } = await post(MAIN_ENDPOINT.Processing.Search, body);

//       if (!OK) {
//         throw new Error((Kind as { error: string }).error);
//       }
//       return Kind;
//     },
//     mutationKey: ["search.references"],
//     onSuccess,
//     onError,
//   });
// };

// export const useFetchHistoryById = (
//   id: string,
//   onSuccess?: () => void,
//   onError?: () => void
// ) => {
//   return useQuery({
//     queryFn: async () => {
//       const { Kind, OK } = await get(MAIN_ENDPOINT.Info.HistoryByID.replace(":id", id));
//       if (!OK) {
//         throw new Error(
//           (Kind as { message: string }).message ||
//             (Kind as { Message: string }).Message
//         );
//       }
//       return (Kind as any).data;
//     },
//     queryKey: ["fetch.history.by.id", id],
//   }) as any;
// };

export const useFetchHistory = (
	onSuccess?: () => void,
	onError?: () => void,
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
	onSuccess?: () => void,
	onError?: () => void,
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
