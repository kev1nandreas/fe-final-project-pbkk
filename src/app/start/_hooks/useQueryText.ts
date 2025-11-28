import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { post } from "@/services/api/main/call";
import { MAIN_ENDPOINT } from "@/services/api/main/endpoint";
import { PATH } from "@/shared/path";
import type { LLMRequestData } from "@/types/search";

export const useSearchReferences = ({
	onSuccess,
	onError,
}: {
	onSuccess: (data: any) => void;
	onError: (error: any) => void;
}) => {
	const router = useRouter();

	return useMutation({
		mutationFn: async (body: LLMRequestData) => {
			const { Kind, OK } = await post(MAIN_ENDPOINT.Processing.Search, body);

			if (!OK) {
				throw new Error((Kind as { error: string }).error);
			}
			return Kind;
		},
		mutationKey: ["search.references"],
		onSuccess: (data: any) => {
			toast.success("Pencarian referensi berhasil.");
			router.push(`${PATH.RESULT}/${data.data.id}`);
			onSuccess(data);
		},
		onError: (error: any) => {
			toast.error(
				`Gagal mencari referensi: ${
					error?.message || "Terjadi kesalahan tak terduga."
				}`,
			);
			onError(error);
		},
	});
};
