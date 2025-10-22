"use client";

import { motion } from "framer-motion";
import CircularProgress from "@/components/ui/CircularPrrogress";
import { useMemo, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useParams } from "next/navigation";
import { useFetchHistoryById } from "@/services/api/hook/useAI";
import { HistoryListItem } from "@/types/response";
import CopyButton from "@/components/ui/CopyButton";

export default function ResultPage() {
  const { id } = useParams();
  const { data: results, isLoading } = useFetchHistoryById(id as string);
  const resultsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    return results
      ? results.results.slice(startIndex, startIndex + resultsPerPage)
      : [];
  }, [results, currentPage]);

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
              <span className="text-xl font-bold text-white">CC</span>
            </div>
            <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
              Citation Analysis Results
            </h1>
          </div>
          <p className="text-gray-600">
            Found {results.result_count} potential citation
            {results.result_count !== 1 ? "s" : ""} for your document
          </p>
        </div>

        {/* Queried Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 rounded-2xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-base">
              ✍️
            </span>
            <h2 className="text-lg font-semibold text-gray-900">
              Queried Paragraph
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-700">
            {results.query_text}
          </p>
        </motion.div>

        {/* Results Grid */}
        <div className="space-y-6">
          {paginatedResults.map((result: HistoryListItem, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden rounded-2xl border border-white/30 bg-white/70 shadow-xl backdrop-blur-lg transition-shadow hover:shadow-2xl"
            >
              <div className="p-6">
                {/* Top Section: Score and Title */}
                <div className="mb-6 flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                        Match #{index + 1}
                      </span>
                      <span className="text-xs text-gray-500">
                        {result.source_paper}
                      </span>
                    </div>

                    {/* Citation Recommendation */}
                    <div className="mb-4 rounded-xl bg-blue-50/50 p-4 relative">
                      <p className="text-sm font-medium text-gray-700">
                        <span className="font-semibold text-blue-700">
                          📚 Recommmeded Citation:
                        </span>
                      </p>
                      <p className="mt-2 text-sm italic text-gray-800">
                        {result.citation_suggestion}
                      </p>

                      <CopyButton text={result.citation_suggestion} />
                    </div>
                  </div>

                  {/* Circular Progress */}
                  <div className="flex-shrink-0">
                    <CircularProgress
                      score={result.similarity_score * 100}
                      size={100}
                      strokeWidth={10}
                      animated={true}
                    />
                  </div>
                </div>

                {/* Similar Text Section */}
                <div className="rounded-xl bg-purple-50/50 p-4">
                  <p className="mb-2 text-sm font-semibold text-purple-700">
                    📝 Similar Text Found:
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
        {results.result_count === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white/60 p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <span className="text-2xl">📄</span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              No Results Yet
            </h3>
            <p className="text-sm text-gray-600">
              Upload a document to start analyzing citations
            </p>
          </div>
        )}

        {results.result_count > 0 && (
          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <span className="text-sm text-gray-500">
              Showing{" "}
              {results.result_count === 0 ? 0 : currentPage * resultsPerPage}–
              {currentPage * resultsPerPage + resultsPerPage} of{" "}
              {results.result_count}
            </span>
            <Stack spacing={2} className="self-end md:self-auto">
              <Pagination
                count={Math.ceil(results.result_count / resultsPerPage)}
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
        )}
      </motion.div>
    </div>
  );
}
