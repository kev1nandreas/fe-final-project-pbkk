"use client";

import { useState } from "react";
import { motion } from "motion/react";
import History from "@/components/ui/History";

const history = [
  {
    id: 1,
    usedAt: "2025-10-10 14:23",
    title: "Deep Learning for Natural Language Processing",
  },
  {
    id: 2,
    usedAt: "2025-10-09 09:15",
    title: "Citation Analysis in Academic Research",
  },
  {
    id: 3,
    usedAt: "2025-10-08 17:42",
    title: "Efficient Document Embedding Methods",
  },
];

export default function HistoryPage() {
  const [historyList] = useState(history);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20, maxWidth: "42rem" }}
        animate={{ opacity: 1, y: 0, maxWidth: "42rem" }}
        transition={{
          duration: 0.3,
          x: { type: "spring", stiffness: 300, damping: 30, mass: 0.5 },
          maxWidth: { type: "tween", duration: 0.3, ease: "anticipate" },
        }}
        className="w-full max-w-2xl mx-auto px-4 bg-white/10 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/5 shadow-2xl border border-white/30 rounded-2xl py-8 relative"
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
          {historyList.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No history found.
            </div>
          ) : (
            historyList.map((item) => <History key={item.id} item={item} />)
          )}
        </div>
      </motion.div>
    </div>
  );
}
