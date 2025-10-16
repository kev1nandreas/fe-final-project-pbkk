"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Upload from "@/components/ui/Upload";
import References from "@/components/ui/References";
import CardController from "@/components/ui/CardController";
import { ReferencesResponse } from "@/types/response";
import {
  useAddReferences,
  useFetchModels,
  useFetchReferences,
} from "@/services/api/hook/useInfo";
import { ReferenceUploadData } from "@/types/request";
import { toast } from "react-hot-toast";

export default function ReferencesPage() {
  const { data: referenceList, isLoading } = useFetchReferences();
  const { data: modelList } = useFetchModels();
  const [modelParsed, setModelParsed] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (modelList) {
      const formattedModels: { value: string; label: string }[] = [];
      modelList.ollama.concat(modelList.gemini).forEach((model: string) => {
        formattedModels.push({
          value: model,
          label:
            model.charAt(0).toUpperCase() + model.slice(1).replace(/-/g, " "),
        });
      });
      setModelParsed(formattedModels);
    }
  }, [modelList]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadResetKey, setUploadResetKey] = useState(0);

  const methods = useForm<ReferenceUploadData>({
    defaultValues: {
      model_name: modelParsed[0]?.value
    }
  });

  const model_name = methods.watch("model_name", "llama-2");
  const uploadedFiles = methods.watch("files");

  useEffect(() => {
    methods.register("model_name");
  }, [methods]);

  useEffect(() => {
    if (uploadedFiles && uploadedFiles.length > 0) {
      methods.clearErrors("files");
    }
  }, [uploadedFiles, methods]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUploadResetKey((previous) => previous + 1);
    methods.clearErrors("files");
  };

  const mutation = useAddReferences({
    onSuccess: () => {
      toast.success("References uploaded successfully");
      handleCloseModal();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmitUpload: SubmitHandler<ReferenceUploadData> = async (data) => {
    if (!data.files || data.files.length === 0) {
      methods.setError("files", { type: "manual", message: "Please upload at least one reference document" });
      return;
    }

    const formData = new FormData();
    formData.append("model_name", data.model_name);

    Array.from(data.files).forEach((file) => formData.append("files", file));

    await mutation.mutateAsync(formData);
    handleCloseModal();
  };

  const isUploading = mutation.isPending;

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
              referenceList.map(
                (reference: ReferencesResponse, index: number) => (
                  <References key={index} reference={reference} />
                )
              )
            )}
          </div>
        </div>
      </motion.div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-white/20 bg-white/95 p-6 shadow-2xl">
            <button
              type="button"
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 disabled:text-gray-400"
              onClick={handleCloseModal}
              aria-label="Close"
              disabled={isUploading}
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
                  id="model_name"
                  type="select"
                  title="Model Embedding"
                  description="Determine which embedding engine to apply to the uploaded references."
                  value={model_name}
                  onChange={(value) =>
                    methods.setValue("model_name", value, {
                      shouldDirty: true,
                      shouldTouch: true,
                    })
                  }
                  options={modelParsed}
                  disabled={isUploading}
                />

                <Upload
                  key={uploadResetKey}
                  id="files"
                  accept=".pdf,.doc,.docx,.txt"
                  multiple
                  maxSize={20}
                  placeholder="Drag and drop documents or click to browse"
                  disabled={isUploading}
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
                    className="bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={handleCloseModal}
                    disabled={isUploading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={isUploading}
                  >
                    {isUploading ? "Uploading..." : "Save References"}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-sm">
              <div className="w-full max-w-xs">
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full w-full animate-pulse bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
                </div>
                <p className="mt-3 text-center text-sm font-medium text-gray-700">Uploading references…</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
