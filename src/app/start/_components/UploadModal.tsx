"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import SelectInput from "@/components/form/SelectInput";
import UploadFile from "@/components/form/UploadFile";
import UnstyledLink from "@/components/links/UnstyledLink";
import { options } from "@/lib/options";
import { PATH } from "@/shared/path";
import type { UploadModalProps } from "@/types/layout";
import { useAddReferences } from "../_hooks/useAddReferences";

interface ReferenceUploadData {
	files?: FileList;
	organization: string;
}

export default function UploadModal({
	isOpen,
	onClose,
	showBackdrop = false,
}: UploadModalProps) {
	const methods = useForm<ReferenceUploadData>({
		defaultValues: {
			files: undefined,
		},
	});

	const mutation = useAddReferences({
		onSuccess: () => {
			methods.reset();
			handleClose();
		},
		onError: (error) => {
			console.error("Error uploading references:", error);
		},
	});

	const uploadedFiles = methods.watch("files");

	useEffect(() => {
		if (uploadedFiles && uploadedFiles.length > 0) {
			methods.clearErrors("files");
		}
	}, [uploadedFiles, methods]);

	const handleClose = () => {
		onClose ? onClose() : null;
	};

	const handleSubmit: SubmitHandler<ReferenceUploadData> = (data) => {
		if (!data.files || data.files.length === 0) {
			methods.setError("files", {
				type: "manual",
				message: "Silakan unggah setidaknya satu dokumen referensi",
			});
			return;
		}
		console.log("Submitting files:", data);
		const formData = new FormData();
		Array.from(data.files).forEach((file) => {
			formData.append("files", file);
		});
		mutation.mutateAsync(formData);
	};

	if (!isOpen) return null;

	const modalContent = (
		<motion.div
			initial={{ scale: 0.8, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ duration: 0.2 }}
			className="relative w-full max-w-2xl mx-auto rounded-3xl border-2 border-blue-100 bg-white p-8 shadow-2xl"
		>
			<div className="mb-6">
				<h3 className="text-2xl font-bold text-gray-900 mb-2">
					Unggah Referensi Baru
				</h3>
				<p className="text-base text-gray-600">
					Pilih satu atau lebih dokumen PDF untuk diproses sebagai referensi
					sitasi Anda.
				</p>
			</div>

			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(handleSubmit)}
					className="space-y-6"
				>
					<div className="rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/30 p-6">
						<UploadFile
							id="files"
							disabled={mutation.isPending}
							accept={{ "application/pdf": [".pdf"] }}
							maxFiles={1}
							maxSize={10 * 1024 * 1024}
							className="border-none! bg-white! hover:bg-blue-50!"
							validation={{
								required: "Silakan unggah setidaknya satu dokumen referensi",
							}}
						/>
						<p className="mt-4 text-center text-sm text-gray-500">
							Format: PDF • Ukuran maksimal: 10MB per file • Maksimal 1 file
						</p>
					</div>

					<SelectInput
						id="organization"
						label="Pilih Organisasi"
						options={options}
						placeholder="Pilih opsi organisasi"
						isSearchable={false}
						validation={{ required: "Organisasi wajib diisi!" }}
					/>

					<div className="flex flex-col sm:flex-row justify-end gap-3">
						<Button type="button" variant="outline" className="px-8 text-black">
							<UnstyledLink href={`${PATH.START}?plan=without-citation`}>
								Lewati langkah ini
							</UnstyledLink>
						</Button>
						<Button type="submit" variant="blue" className="text-white px-8">
							{mutation.isPending ? (
								<span className="flex items-center gap-2">
									<span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
									Mengunggah...
								</span>
							) : (
								"Upload Referensi"
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
							Sedang mengunggah referensi...
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
