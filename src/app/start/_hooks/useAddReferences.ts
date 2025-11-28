import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { upload } from "@/services/api/main/call";
import { MAIN_ENDPOINT } from "@/services/api/main/endpoint";

export const useAddReferences = ({
	onSuccess,
	onError,
}: {
	onSuccess?: (data: any) => void;
	onError?: (error: any) => void;
} = {}) => {
	return useMutation({
		mutationFn: async (body: FormData) => {
			const { Kind, OK } = await upload(
				MAIN_ENDPOINT.Processing.UploadReferences,
				body,
			);

			if (!OK) {
				throw new Error((Kind as { error: string }).error);
			}
			return Kind;
		},
		mutationKey: ["add.references"],
		onSuccess: (data: any) => {
			toast.success("Dokumen referensi berhasil diunggah dan diproses.");
			onSuccess?.(data);
		},
		onError: (error: any) => {
			toast.error(
				`Gagal mengunggah dokumen referensi: ${
					error?.message || "Terjadi kesalahan tak terduga."
				}`,
			);
			onError?.(error);
		},
	});
};
