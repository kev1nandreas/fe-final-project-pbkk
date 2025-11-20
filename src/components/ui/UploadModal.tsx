"use client";

import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Upload from "@/components/ui/Upload";
import CardController from "@/components/ui/CardController";
import { ReferenceUploadData } from "@/types/request";
import { motion, AnimatePresence } from "framer-motion";
import { useAddReferences, useFetchModels } from "@/services/api/hook/useInfo";
import { toast } from "react-hot-toast";
import { UploadModalProps } from "@/types/props";

export default function UploadModal({
  isOpen,
  onClose,
  allowSkip = false,
  skipHandler,
  showBackdrop = false, // Default to false
}: UploadModalProps) {
  const { data: modelList } = useFetchModels();
  const providerDict: Record<string, string[]> = (() => {
    if (!modelList || typeof modelList !== "object") return {};
    return Object.entries(modelList).reduce<Record<string, string[]>>(
      (acc, [key, value]) => {
        acc[key] = Array.isArray(value) ? value : [];
        return acc;
      },
      {},
    );
  })();
  // console.log(providerDict);
  const [uploadKey, setUploadKey] = useState(0);
  const [isSuccess, setIsSuccess] = useState("not_started");

  const methods = useForm<ReferenceUploadData>({
    defaultValues: {
      model_name: "gemini-2.5-flash",
    },
  });

  const model_name = methods.watch("model_name", "gemini-2.5-flash");
  const uploadedFiles = methods.watch("files");

  // Parse model options
  const modelOptions = modelList
    ? modelList.ollama
        .concat(modelList.google.concat(modelList.senopati))
        .map((model: string) => ({
          value: model,
          label:
            model.charAt(0).toUpperCase() + model.slice(1).replace(/-/g, " "),
        }))
    : [];

  useEffect(() => {
    methods.register("model_name");
  }, [methods]);

  useEffect(() => {
    if (uploadedFiles && uploadedFiles.length > 0) {
      methods.clearErrors("files");
    }
  }, [uploadedFiles, methods]);

  // Handle submission internally
  const mutation = useAddReferences({
    onSuccess: () => {
      toast.success("References uploaded successfully");
      methods.reset({
        model_name: "gemini-2.5-flash",
        files: undefined,
      });
      setUploadKey((prev) => prev + 1);
      console.log("Closing modal in 5 seconds...");

      setTimeout(() => {
        handleClose();
        setIsSuccess("not_started");
        console.log("Modal closed.");
      }, 5000);
    },
    onError: (error) => {
      toast.error(error.message);
      setIsSuccess("not_started");
    },
  });

  const handleClose = () => {
    if (!mutation.isPending && onClose) {
      onClose();
    }
  };

  const handleSubmit: SubmitHandler<ReferenceUploadData> = async (data) => {
    if (!data.files || data.files.length === 0) {
      methods.setError("files", {
        type: "manual",
        message: "Please upload at least one reference document",
      });
      return;
    }

    const formData = new FormData();
    formData.append("model_name", data.model_name);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const provider =
      Object.entries(providerDict).find(([_, models]) =>
        models.includes(data.model_name),
      )?.[0] || "unknown";
    formData.append("provider", provider);
    // console.log("Uploading with provider:", provider);
    Array.from(data.files).forEach((file) => formData.append("files", file));

    setIsSuccess("uploading");
    await mutation.mutateAsync(formData);
  };

  const modalContent = (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="relative w-full max-w-lg rounded-2xl border border-white/20 bg-white/95 p-6 shadow-2xl"
    >
      {!allowSkip && (
        <button
          type="button"
          className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-gray-700 disabled:text-gray-400"
          onClick={handleClose}
          aria-label="Close"
          disabled={mutation.isPending}
        >
          ×
        </button>
      )}

      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        Upload New References
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Select one or more documents and choose the embedding model to process
        them.
      </p>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
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
            options={modelOptions}
            disabled={mutation.isPending}
          />

          <Upload
            key={uploadKey}
            id="files"
            accept=".pdf"
            multiple
            maxSize={10}
            placeholder="Drag and drop documents or click to browse"
            disabled={mutation.isPending}
            validation={{
              minLength: {
                value: 1,
                message: "Please upload at least one reference document",
              },
            }}
          />

          <div className="flex justify-end gap-2">
            {allowSkip && (
              <Button
                type="button"
                className="!bg-transparent text-start !text-blue-500 hover:!text-pink-400 disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={() => (skipHandler ? skipHandler() : handleClose())}
                disabled={mutation.isPending}
              >
                Continue to Analyze Text
              </Button>
            )}
            {!allowSkip && (
              <Button
                type="button"
                className="bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleClose}
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Uploading..." : "Save References"}
            </Button>
          </div>
        </form>
      </FormProvider>

      {isSuccess === "uploading" && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-sm">
          <div className="w-full max-w-xs">
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full ${isSuccess === "uploading" ? "w-[30%] animate-pulse" : "w-full"} bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transition-all duration-1000 ease-in-out`}
              ></div>
            </div>
            <p className="mt-3 text-center text-sm font-medium text-gray-700">
              {isSuccess ? "Upload complete!" : "Uploading references…"}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen &&
        (showBackdrop ? (
          // With backdrop (for modal usage)
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          >
            {modalContent}
          </motion.div>
        ) : (
          // Without backdrop (for page usage)
          modalContent
        ))}
    </AnimatePresence>
  );
}
