"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LLMRequestData } from "@/types/request";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Upload from "@/components/ui/Upload";
import ReferenceDatabase from "@/components/ui/ReferenceDatabase";
import CardController from "@/components/ui/CardController";
import {
  useFetchModels,
  useFetchReferences,
} from "@/services/api/hook/useInfo";
import { useSearchReferences } from "@/services/api/hook/useAI";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function MainAppPage() {
  const { data: referenceList } = useFetchReferences();
  const { data: modelList } = useFetchModels();
  const router = useRouter();
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

  const createDefaultValues = (): LLMRequestData => ({
    document: undefined,
    query_text: "",
    similarity_threshold: 0.75,
    citation_strategy: "gemini-2.5-flash",
    reference_sources: [],
  });

  const methods = useForm<LLMRequestData>({
    defaultValues: createDefaultValues(),
  });

  const [isUploadDocument] = useState(false);
  const [isUploadText] = useState(true);
  const selectedReferenceIds = methods.watch("reference_sources", []);
  const similarityThreshold = methods.watch("similarity_threshold", 75);
  const citationStrategy = methods.watch("citation_strategy", "balanced");
  const headerTitle = isUploadDocument
    ? "Upload Your Document"
    : "Enter Your Text";
  const headerSubtitle = isUploadDocument
    ? "Upload your academic paper for citation analysis"
    : "Paste your paragraph or text for citation analysis";

  // const onClickDocument = () => {
  //   setIsUploadDocument(true);
  //   setIsUploadText(false);
  //   methods.reset(createDefaultValues());
  // };

  // const onClickText = () => {
  //   setIsUploadDocument(false);
  //   setIsUploadText(true);
  //   methods.reset(createDefaultValues());
  // };

  const mutation = useSearchReferences({
    onSuccess: (data) => {
      toast.success("Text submitted for analysis");
      methods.reset();
      router.push("/result/" + data.data.id);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<LLMRequestData> = async (data) => {
    await mutation.mutateAsync(data);
  };

  useEffect(() => {
    methods.register("similarity_threshold");
    methods.register("citation_strategy");
    methods.register("reference_sources");
  }, [methods]);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      {/* Upload Container */}
      <motion.div
        initial={{ opacity: 0, y: 20, maxWidth: "50rem" }}
        animate={{
          opacity: 1,
          y: 0,
          x: 0,
          maxWidth: "50rem",
        }}
        transition={{
          duration: 0.3,
          x: { type: "spring", stiffness: 300, damping: 30, mass: 0.5 },
          maxWidth: { type: "tween", duration: 0.3, ease: "anticipate" },
        }}
        className={`w-full max-w-2xl mx-auto p-4`}
      >
        <div className="bg-white/10 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/5 shadow-2xl border border-white/30 rounded-2xl p-8 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none relative">
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
              {headerTitle}
            </h2>
            <p className="text-gray-600">{headerSubtitle}</p>
          </div>

          <div className="relative z-10 space-y-6">
            {/* <div className="flex gap-4 justify-center items-center">
              <Button
                type="button"
                className={`${
                  isUploadDocument ? "bg-blue-400" : "bg-gray-400"
                } w-[12rem]`}
                onClick={onClickDocument}
              >
                Document
              </Button>
              <Button
                type="button"
                className={`${
                  isUploadText ? "bg-blue-400" : "bg-gray-400"
                } w-[12rem]`}
                onClick={onClickText}
              >
                Text
              </Button>
            </div> */}

            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {isUploadDocument && (
                  <Upload
                    id="document"
                    accept=".pdf,.doc,.docx,.txt"
                    maxSize={5}
                    placeholder="Drop your academic paper here or click to browse"
                    className="w-full"
                    validation={{
                      minLength: {
                        value: 1,
                        message: "Please upload a document to analyze",
                      },
                    }}
                  />
                )}
                {isUploadText && (
                  <div>
                    <textarea
                      id="query_text"
                      rows={8}
                      placeholder="Paste your academic text here for citation analysis..."
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm h-[12rem] border border-black/30 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
                      {...methods.register("query_text", {
                        required: "Please enter some text to analyze",
                        minLength: {
                          value: 10,
                          message: "Text must be at least 10 characters long",
                        },
                      })}
                    />
                    {methods.formState.errors.query_text && (
                      <p className="mt-2 text-sm text-red-600">
                        {methods.formState.errors.query_text.message}
                      </p>
                    )}
                  </div>
                )}

                <Button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transform transition-all ease-in-out duration-400 px-6 py-3 ${mutation.isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Analyzing..." : "Analyze Citations"}
                </Button>

                <div className="grid gap-4 md:grid-cols-2">
                  <CardController
                    id="similarity_threshold"
                    type="range"
                    title="Similarity Threshold"
                    description="Set the minimum match percentage before a citation is flagged."
                    helperText="Higher values demand closer matches."
                    min={0.5}
                    max={1}
                    step={0.05}
                    unit="%"
                    value={similarityThreshold}
                    onChange={(value) =>
                      methods.setValue("similarity_threshold", value, {
                        shouldDirty: true,
                        shouldTouch: true,
                      })
                    }
                  />
                  <CardController
                    id="Model Selection"
                    type="select"
                    title="Model Selection"
                    description="Choose what model to use for citation analysis."
                    value={citationStrategy || "gemini-2.5-flash"}
                    onChange={(value) =>
                      methods.setValue("citation_strategy", value, {
                        shouldDirty: true,
                        shouldTouch: true,
                      })
                    }
                    options={modelParsed}
                  />
                </div>

                <ReferenceDatabase
                  catalog={referenceList || []}
                  selectedIds={selectedReferenceIds}
                  onSelectionChange={(ids) =>
                    methods.setValue("reference_sources", ids, {
                      shouldDirty: true,
                      shouldTouch: true,
                    })
                  }
                />
              </form>
            </FormProvider>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
