"use client";

import { motion } from "framer-motion";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import SelectInput from "@/components/form/SelectInput";
import Slider from "@/components/form/Slider";
import TextArea from "@/components/form/TextArea";
import { options } from "@/lib/options";
import type { UploadModalProps } from "@/types/layout";
import { useSearchReferences } from "../_hooks/useQueryText";

interface QueryData {
	query_text: string;
	similarity_threshold: number;
	organization: string;
}

export default function QueryBox({
	isOpen,
	showBackdrop = false,
}: UploadModalProps) {
	const methods = useForm<QueryData>({
		defaultValues: {
			query_text: "",
			similarity_threshold: 0.5,
			organization: "Lainnya",
		},
	});

	const mutation = useSearchReferences({
		onSuccess: (data) => {
			console.log("Search results:", data);
		},
		onError: (error) => {
			console.error("Error searching references:", error);
		},
	});

	const handleSubmit: SubmitHandler<QueryData> = (data) => {
		console.log("Submitting query:", data);

		mutation.mutate(data);
	};

	if (!isOpen) return null;

	const modalContent = (
		<motion.div
			initial={{ scale: 0.8, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ duration: 0.2 }}
			className="relative w-full mt-[4rem] max-w-2xl mx-auto rounded-3xl border-2 border-blue-100 bg-white p-8 shadow-2xl"
		>
			<div className="mb-6">
				<h3 className="text-2xl font-bold text-gray-900 mb-2">
					Cari Referensi
				</h3>
				<p className="text-base text-gray-600">
					Masukkan kalimat atau paragraf yang ingin Anda cari dalam dokumen
					referensi.
				</p>
			</div>

			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(handleSubmit)}
					className="space-y-6"
				>
					<div className="rounded-2xl border-2 border-blue-200 bg-blue-50/30 p-6">
						<TextArea
							id="query_text"
							label="Pertanyaan"
							placeholder="Contoh: Steganografi adalah teknik menyembunyikan informasi di dalam media digital."
							disabled={mutation.isPending}
							rows={6}
							maxLength={500}
							containerClassName="mb-0"
							className="bg-white hover:bg-blue-50/50 transition-colors"
							validation={{
								required: "Silakan masukkan pertanyaan Anda",
								minLength: {
									value: 10,
									message: "Pertanyaan minimal 10 karakter",
								},
							}}
						/>
					</div>

					<div className="rounded-2xl border-2 border-blue-200 bg-blue-50/30 p-6 flex flex-col gap-5">
						<SelectInput
							id="organization"
							label="Filter Sumber Organisasi"
							options={options}
							placeholder="Pilih sumber organisasi"
							isSearchable={false}
							validation={{ required: "Organisasi wajib diisi!" }}
						/>
						<Slider
							id="similarity_threshold"
							label="Tingkat Kemiripan"
							min={0}
							max={1}
							step={0.01}
							showValue={true}
							valueLabel="Semakin tinggi, semakin ketat hasil pencarian"
							disabled={mutation.isPending}
							validation={{
								required: "Tingkat kemiripan harus diatur",
								min: { value: 0, message: "Minimal 0%" },
								max: { value: 1, message: "Maksimal 100%" },
							}}
						/>
					</div>

					<div className="flex flex-col sm:flex-row justify-end gap-3">
						<Button
							type="submit"
							variant="blue"
							className="text-white px-8"
							disabled={mutation.isPending}
						>
							{mutation.isPending ? (
								<span className="flex items-center gap-2">
									<span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
									Mencari...
								</span>
							) : (
								"Cari Referensi"
							)}
						</Button>
					</div>
				</form>
			</FormProvider>

			{mutation.isPending && (
				<div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-white/90 backdrop-blur-sm">
					<div className="w-full max-w-md px-8">
						<div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
							<div className="h-full w-1/3 animate-pulse bg-linear-to-r from-blue-500 via-purple-500 to-blue-500 transition-all duration-1000 ease-in-out"></div>
						</div>
						<p className="text-center text-base font-medium text-gray-700">
							Sedang mencari referensi yang relevan...
						</p>
					</div>
				</div>
			)}
		</motion.div>
	);

	return showBackdrop ? (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
			{modalContent}
		</div>
	) : (
		modalContent
	);
}
