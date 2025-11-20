"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import References from "@/components/ui/References";
import { useFetchReferences } from "@/services/api/hook/useInfo";
import UploadModal from "@/components/ui/UploadModal";
import { useState } from "react";

export default function ReferencesPage() {
  const { data: referenceList, isLoading } = useFetchReferences();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
        <p className="text-gray-500">Loading references...</p>
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
            Reference Library
          </h2>
          <p className="text-gray-600">
            Review existing references and upload additional documents to expand
            the catalog.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-2xl border border-white/30 bg-white/60 backdrop-blur px-4 py-3 shadow-inner">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Managed References
              </p>
              <p className="text-xs text-gray-500">
                {referenceList.length} total references
              </p>
            </div>
            <Button
              type="button"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              onClick={() => setIsModalOpen(true)}
            >
              Add Reference
            </Button>
          </div>

          <div className="space-y-4">
            {referenceList.length === 0 ? (
              <p className="rounded-xl border border-dashed border-gray-300 bg-white/60 p-6 text-center text-sm text-gray-500">
                No references have been uploaded yet.
              </p>
            ) : (
              referenceList.map((reference: string, index: number) => (
                <References key={index} reference={reference} />
              ))
            )}
          </div>
        </div>
      </motion.div>

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        allowSkip={false}
        showBackdrop={true} // Enable backdrop for modal
      />
    </div>
  );
}
