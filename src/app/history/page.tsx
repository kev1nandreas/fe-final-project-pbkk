"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import History from "@/components/ui/History";
import { useFetchHistory } from "@/services/api/hook/useAI";
import { HistoryResponse } from "@/types/response";

export default function HistoryPage() {
  const { data: historyList, isLoading } = useFetchHistory();
  const itemsPerPage = 5;
  const histories = useMemo<HistoryResponse[]>(
    () => historyList ?? [],
    [historyList]
  );
  const totalItems = histories.length;
  const [currentPage, setCurrentPage] = useState(1);

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
  }, [totalItems, currentPage, itemsPerPage]);

  const paginatedHistory = useMemo(() => {
    if (histories.length === 0) {
      return [] as HistoryResponse[];
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    return histories.slice(startIndex, startIndex + itemsPerPage);
  }, [histories, currentPage, itemsPerPage]);

  const showingFrom = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const showingTo = totalItems === 0
    ? 0
    : Math.min(showingFrom + paginatedHistory.length - 1, totalItems);

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20, maxWidth: "50rem" }}
        animate={{ opacity: 1, y: 0, maxWidth: "50rem" }}
        transition={{
          duration: 0.3,
          x: { type: "spring", stiffness: 300, damping: 30, mass: 0.5 },
          maxWidth: { type: "tween", duration: 0.3, ease: "anticipate" },
        }}
        className="w-full max-w-2xl mx-auto p-4 bg-white/10 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/5 shadow-2xl border border-white/30 rounded-2xl py-8 relative"
      >
        <div className="relative text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">CC</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              Citation Checker
            </h1>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            History of Citation Checking
          </h2>
          <p className="text-gray-600">
            Below are your recent citation checks and their document titles.
          </p>
        </div>

        {/* History List */}
        <div className="space-y-6">
          {totalItems === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No history found.
            </div>
          ) : (
            <>
              {paginatedHistory.map((item: HistoryResponse) => (
                <History key={item.id} item={item} />
              ))}

              <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <span className="text-sm text-gray-500">
                  Showing {showingFrom}–{showingTo} of {totalItems}
                </span>
                <Stack spacing={2} className="self-end md:self-auto">
                  <Pagination
                    count={Math.max(1, Math.ceil(totalItems / itemsPerPage))}
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
      </motion.div>
    </div>
  );
}
