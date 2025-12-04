"use client";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import History from "@/components/History";
import { useStaggerFadeIn } from "@/hooks/useGsapAnimation";
import { useFetchHistory } from "@/services/api/hook/useAI";
import type { HistoryResponse } from "@/types/api";

export default function HistoryPageContainer() {
	const { data: historyList, isLoading } = useFetchHistory();
	const itemsPerPage = 5;
	const histories = useMemo<HistoryResponse[]>(
		() => historyList ?? [],
		[historyList],
	);
	const totalItems = histories.length;
	const [currentPage, setCurrentPage] = useState(1);

	const heroTextRef = useStaggerFadeIn<HTMLDivElement>({
		stagger: 0.15,
		duration: 0.8,
		yFrom: 30,
		ease: "power3.out",
	});

	useEffect(() => {
		if (totalItems === 0) {
			if (currentPage !== 1) {
				setCurrentPage(1);
			}
			return;
		}

		const maxPage = Math.max(1, Math.ceil(totalItems / itemsPerPage));
		if (currentPage > maxPage) {
			setCurrentPage(maxPage);
		}
	}, [totalItems, currentPage]);

	const paginatedHistory = useMemo(() => {
		if (histories.length === 0) {
			return [] as HistoryResponse[];
		}

		const startIndex = (currentPage - 1) * itemsPerPage;
		return histories.slice(startIndex, startIndex + itemsPerPage);
	}, [histories, currentPage]);

	const showingFrom =
		totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
	const showingTo =
		totalItems === 0
			? 0
			: Math.min(showingFrom + paginatedHistory.length - 1, totalItems);

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
		<section id="history" className="flex min-h-screen py-20 items-center">
			<div className="mx-auto px-6 md:px-[13%]">
				<div className="flex flex-col items-start gap-12 lg:mt-10">
					<div
						ref={heroTextRef}
						className="hero-text flex-1 text-center lg:text-left"
					>
						<h1 className="opacity-0 text-4xl lg:text-6xl font-bold mb-4">
							<span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
								Riwayat Pengecekan
							</span>
						</h1>
						<p className="opacity-0 text-lg text-gray-700 max-w-xl">
							Lihat riwayat pengecekan sitasi Anda dan pantau dokumen yang telah
							diverifikasi.
						</p>
					</div>

					{/* Right side - History List */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="flex-1 w-full"
					>
						<div className="bg-white/60 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/40 shadow-2xl border border-white/30 rounded-2xl">
							{/* History List */}
							<div className="space-y-6">
								{totalItems === 0 ? (
									<div className="text-center text-gray-500 py-12">
										<div className="text-5xl mb-4">📋</div>
										<p className="text-lg font-medium">Belum ada riwayat</p>
										<p className="text-sm text-gray-400 mt-2">
											Mulai menggunakan CitaCheck untuk melihat riwayat
											pengecekan Anda.
										</p>
									</div>
								) : (
									<>
										{paginatedHistory.map((item: HistoryResponse) => (
											<History key={item.id} item={item} />
										))}

										<div className="m-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between pt-4 border-t border-gray-200/50">
											<span className="text-sm text-gray-500">
												Menampilkan {showingFrom}–{showingTo} dari {totalItems}
											</span>
											<Stack spacing={2} className="self-end md:self-auto">
												<Pagination
													count={Math.max(
														1,
														Math.ceil(totalItems / itemsPerPage),
													)}
													page={currentPage}
													onChange={(_, value) => setCurrentPage(value)}
													siblingCount={1}
													boundaryCount={1}
													color="primary"
													shape="rounded"
													sx={{
														"& .MuiPagination-ul": { gap: "0.25rem" },
														"& .MuiPaginationItem-root": {
															color: "#1F2937",
															borderColor: "#BFDBFE",
															backgroundColor: "rgba(255, 255, 255, 0.85)",
															fontWeight: 500,
														},
														"& .MuiPaginationItem-root:hover": {
															backgroundColor: "rgba(59, 130, 246, 0.12)",
														},
														"& .Mui-selected": {
															backgroundColor: "#2563EB !important",
															color: "#ffffff",
															borderColor: "#2563EB",
														},
													}}
												/>
											</Stack>
										</div>
									</>
								)}
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
