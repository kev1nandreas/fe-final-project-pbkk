"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import References from "@/components/References";
import { useStaggerFadeIn } from "@/hooks/useGsapAnimation";
import { useFetchReferences } from "@/services/api/hook/useAI";
import { PATH } from "@/shared/path";

export default function ReferencesPageContainer() {
	const { data: referenceList, isLoading } = useFetchReferences();
	const router = useRouter();

	const heroTextRef = useStaggerFadeIn<HTMLDivElement>({
		stagger: 0.15,
		duration: 0.8,
		yFrom: 30,
		ease: "power3.out",
	});

	if (isLoading) {
		return (
			<section className="py-20">
				<div className="mx-auto px-6 lg:px-[13%]">
					<div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
						<div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section
			id="references"
			className="flex min-h-[calc(100vh-5rem)] py-20 items-center"
		>
			<div className="mx-auto px-6 lg:px-[13%] w-full">
				<div className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
					{/* Left side - Text content */}
					<div
						ref={heroTextRef}
						className="hero-text flex-1 text-center lg:text-left"
					>
						<h1 className="opacity-0 text-4xl lg:text-6xl font-bold mb-4">
							<span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
								Pustaka Referensi
							</span>
						</h1>
						<p className="opacity-0 text-lg text-gray-700 mb-5 max-w-xl">
							Kelola koleksi referensi Anda dan unggah dokumen tambahan untuk
							memperluas katalog sitasi.
						</p>

						<Button
							type="button"
							variant="blue"
							onClick={() => router.push(`${PATH.START}?plan=with-citation`)}
						>
							Tambah Referensi
						</Button>
					</div>

					{/* Right side - References List */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="flex-1 w-full"
					>
						<div className="bg-white/60 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/40 shadow-2xl border border-white/30 rounded-2xl p-6 lg:p-8">
							{/* Header with Add Button */}
							<div className="flex items-center justify-between rounded-2xl border border-white/30 bg-white/60 backdrop-blur px-4 py-3 shadow-inner mb-6">
								<div>
									<p className="text-sm font-semibold text-gray-900">
										Referensi Tersedia
									</p>
									<p className="text-xs text-gray-500">
										{referenceList?.length || 0} total referensi
									</p>
								</div>
							</div>

							{/* References List */}
							<div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
								{!referenceList || referenceList.length === 0 ? (
									<div className="text-center text-gray-500 py-12">
										<div className="text-5xl mb-4">📚</div>
										<p className="text-lg font-medium">Belum ada referensi</p>
										<p className="text-sm text-gray-400 mt-2">
											Klik tombol "Tambah Referensi" untuk mengunggah dokumen
											baru.
										</p>
									</div>
								) : (
									referenceList.map((reference: string) => (
										<References key={reference} reference={reference} />
									))
								)}
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
