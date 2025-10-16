"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Upload from "@/components/ui/Upload";
import References from "@/components/ui/References";
import CardController from "@/components/ui/CardController";
import { ReferencesResponse } from "@/types/response";
import { useFetchReferences } from "@/services/api/hook/useInfo";

type ReferenceUploadForm = {
  files?: FileList;
  embeddingModel: string;
};

export default function ReferencesPage() {
  const { data: referenceList, isLoading } = useFetchReferences();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadResetKey, setUploadResetKey] = useState(0);

  const createDefaultValues = (): ReferenceUploadForm => ({
    files: undefined,
    embeddingModel: "llama-2",
  });

  const methods = useForm<ReferenceUploadForm>({
    defaultValues: createDefaultValues(),
  });

  const embeddingModel = methods.watch("embeddingModel", "llama-2");
  const uploadedFiles = methods.watch("files");

  useEffect(() => {
    methods.register("embeddingModel");
  }, [methods]);

  useEffect(() => {
    if (uploadedFiles && uploadedFiles.length > 0) {
      methods.clearErrors("files");
    }
  }, [uploadedFiles, methods]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    methods.reset(createDefaultValues());
    setUploadResetKey((previous) => previous + 1);
    methods.clearErrors("files");
  };

  const handleSubmitUpload: SubmitHandler<ReferenceUploadForm> = (data) => {
    console.log("Uploading files with embedding model:", data);
    handleCloseModal();
  };

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
              referenceList.map((reference: ReferencesResponse) => (
                <References key={reference.model_name} reference={reference} />
              ))
            )}
          </div>
        </div>
      </motion.div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-white/20 bg-white/95 p-6 shadow-2xl">
            <button
              type="button"
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              ×
            </button>

            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Upload New References
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Select one or more documents and choose the embedding model to
              process them.
            </p>

            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(handleSubmitUpload)}
                className="space-y-5"
              >
                <CardController
                  id="embedding-model"
                  type="select"
                  title="Model Embedding"
                  description="Determine which embedding engine to apply to the uploaded references."
                  value={embeddingModel}
                  onChange={(value) =>
                    methods.setValue("embeddingModel", value, {
                      shouldDirty: true,
                      shouldTouch: true,
                    })
                  }
                  options={[
                    { value: "llama-2", label: "LLaMA 2" },
                    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
                    { value: "gpt-4", label: "GPT-4" },
                    {
                      value: "embedding-suite-xl",
                      label: "Embedding Suite XL",
                    },
                  ]}
                />

                <Upload
                  key={uploadResetKey}
                  id="files"
                  accept=".pdf,.doc,.docx,.txt"
                  multiple
                  maxSize={10}
                  placeholder="Drag and drop reference documents or click to browse"
                  validation={{
                    minLength: {
                      value: 1,
                      message: "Please upload at least one reference document",
                    },
                  }}
                />

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  >
                    Save References
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </div>
  );
}
