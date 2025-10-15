"use client";

import { useState } from "react";
import { motion } from "motion/react";
import References from "@/components/ui/References";

const references = [
  {
    id: 1,
    title: "Deep Learning for Natural Language Processing",
    author: "Jane Doe",
    year: 2023,
    summary:
      "A comprehensive overview of deep learning techniques applied to NLP tasks.",
  },
  {
    id: 2,
    title: "Citation Analysis in Academic Research",
    author: "John Smith",
    year: 2022,
    summary: "Methods and tools for analyzing citations in scholarly articles.",
  },
  {
    id: 3,
    title: "Efficient Document Embedding Methods",
    author: "Alice Johnson",
    year: 2024,
    summary:
      "Recent advances in document embedding for large-scale text analysis.",
  },
];

export default function ReferencesPage() {
  const [referenceList] = useState(references);

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
        className={`w-full max-w-2xl mx-auto p-4 bg-white/10 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/5 shadow-2xl border border-white/30 rounded-2xl py-8 relative`}
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
            Uploaded References
          </h2>
          <p className="text-gray-600">
            Here are the references extracted from your uploaded document.
          </p>
        </div>

        {/* References List */}
        <div className="space-y-6">
          {referenceList.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No references found.
            </div>
          ) : (
            referenceList.map((ref) => <References key={ref.id} ref={ref} />)
          )}
        </div>
      </motion.div>
    </div>
  );
}
