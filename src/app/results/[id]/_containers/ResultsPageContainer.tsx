"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import Loading from "@/app/loading";
import CopyButton from "@/components/button/CopyButton";
import CircularProgress from "@/components/CircularProgress";
import PaginationControl from "@/components/table/PaginationControl";
import { useFetchHistoryById } from "../_hooks/useFetchHistoryById";

interface ResultItem {
	similarity_score: number;
	source_paper: string;
	citation_suggestion: string;
	source_content: string;
}

export default function ResultsPageContainer() {
	const { id } = useParams();
	const { data: results, isLoading } = useFetchHistoryById(id as string);
	const resultsPerPage = 5;
	const [params, setParams] = useState({ page: 1, size: resultsPerPage });

	const paginatedResults = useMemo(() => {
		const startIndex = (params.page - 1) * resultsPerPage;
		return results
			? results.results.slice(startIndex, startIndex + resultsPerPage)
			: [];
	}, [results, params.page]);

	if (isLoading) <Loading />;

	return (
		<div className="min-h-[calc(100vh-5rem)] bg-linear-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="mx-auto max-w-6xl mt-[4rem]"
			>
				{/* Header */}
				<div className="mb-8">
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.3 }}
						className="rounded-3xl border-2 border-blue-100 bg-white p-8 shadow-2xl"
					>
						<div className="mb-4 flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-blue-600 to-purple-600 shadow-lg">
									<span className="text-xl font-bold text-white">📚</span>
								</div>
								<div>
									<h1 className="text-2xl font-bold text-gray-900">
										Hasil Analisis Sitasi
									</h1>
									<p className="text-base text-gray-600">
										Ditemukan {results?.result_count || 0} sitasi potensial
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Queried Paragraph */}
				{results?.query_text && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4 }}
						className="mb-6 rounded-2xl border-2 border-blue-200 bg-blue-50/30 p-6"
					>
						<div className="mb-3 flex items-center gap-2">
							<span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-base">
								✍️
							</span>
							<h2 className="text-base font-semibold text-gray-900">
								Teks yang Dicari
							</h2>
						</div>
						<p className="text-sm leading-relaxed text-gray-700">
							{results.query_text}
						</p>
					</motion.div>
				)}

				{/* Results Grid */}
				<div className="space-y-6">
					{paginatedResults.map((result: ResultItem, index: number) => (
						<motion.div
							key={result.citation_suggestion}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="overflow-hidden rounded-3xl border-2 border-blue-100 bg-white shadow-2xl transition-all hover:shadow-xl hover:border-blue-200"
						>
							<div className="p-8">
								{/* Top Section: Score and Title */}
								<div className="mb-6 flex items-start justify-between gap-6">
									<div className="flex-1">
										<div className="mb-4 flex items-center gap-2">
											<span className="inline-block rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
												Hasil #{(params.page - 1) * resultsPerPage + index + 1}
											</span>
											<span className="text-sm font-medium text-gray-600">
												{result.source_paper}
											</span>
										</div>

										{/* Citation Recommendation */}
										<div className="mb-4 rounded-2xl border-2 border-blue-200 bg-blue-50/30 p-6 relative">
											<p className="text-sm font-semibold text-blue-700 mb-2">
												📚 Rekomendasi Sitasi:
											</p>
											<p className="text-sm leading-relaxed text-gray-800">
												{result.citation_suggestion}
											</p>

											<CopyButton text={result.citation_suggestion} />
										</div>
									</div>

									{/* Circular Progress */}
									<div className="shrink-0">
										<CircularProgress
											score={result.similarity_score * 100}
											size={100}
											strokeWidth={10}
											animated={true}
										/>
									</div>
								</div>

								{/* Similar Text Section */}
								<div className="rounded-2xl border-2 border-purple-200 bg-purple-50/30 p-6">
									<p className="mb-3 text-sm font-semibold text-purple-700">
										📝 Teks yang Mirip:
									</p>
									<p className="text-sm leading-relaxed text-gray-700">
										&ldquo;{result.source_content}&rdquo;
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Empty State */}
				{results?.result_count === 0 && (
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3 }}
						className="rounded-3xl border-2 border-dashed border-blue-300 bg-blue-50/20 p-12 text-center"
					>
						<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
							<span className="text-2xl">📄</span>
						</div>
						<h3 className="mb-2 text-lg font-semibold text-gray-900">
							Tidak Ada Hasil
						</h3>
						<p className="text-base text-gray-600">
							Tidak ditemukan sitasi yang cocok dengan pencarian Anda
						</p>
					</motion.div>
				)}

				{results && results.result_count > 0 && (
					<div className="mt-8">
						<div className="rounded-2xl border-2 border-blue-100 bg-white p-6 shadow-lg">
							<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
								<span className="text-sm text-gray-600">
									Menampilkan{" "}
									<span className="font-semibold text-gray-900">
										{(params.page - 1) * resultsPerPage + 1}
									</span>{" "}
									–{" "}
									<span className="font-semibold text-gray-900">
										{Math.min(
											params.page * resultsPerPage,
											results.result_count,
										)}
									</span>{" "}
									dari{" "}
									<span className="font-semibold text-gray-900">
										{results.result_count}
									</span>{" "}
									hasil
								</span>
								<PaginationControl
									data={results.results}
									table={
										{
											getPageCount: () =>
												Math.ceil(results.result_count / resultsPerPage),
											getState: () => ({
												pagination: { pageIndex: params.page - 1 },
											}),
											setPageIndex: () => {},
											previousPage: () => {},
											nextPage: () => {},
										} as any
									}
									setParams={setParams}
								/>
							</div>
						</div>
					</div>
				)}
			</motion.div>
		</div>
	);
}
