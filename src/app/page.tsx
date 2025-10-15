"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LLMRequestData } from "@/types/request";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Upload from "@/components/ui/Upload";
import ReferenceDatabase, {
  ReferenceEntry,
} from "@/components/ui/ReferenceDatabase";
import CardController from "@/components/ui/CardController";

const referenceCatalog: ReferenceEntry[] = [
  {
    original_filename: "catalog-1",
    paper_title: "Enhancing Citation Accuracy in Academic Writing",
    model_name: "CitationAccuracyModelV1",
  },
  {
    original_filename: "catalog-2",
    paper_title: "Automated Reference Matching for Research Integrity",
    model_name: "RefMatchIntegrity2022",
  },
  {
    original_filename: "catalog-3",
    paper_title: "Guidelines for Evaluating Supporting Literature",
    model_name: "GuidelinesEvalModel2023",
  },
];

export default function MainAppPage() {
  const createDefaultValues = (): LLMRequestData => ({
    document: undefined,
    paragraph: "",
    similarityThreshold: 75,
    citationStrategy: "LLaMA 2",
    selectedReferences: [],
  });

  const methods = useForm<LLMRequestData>({
    defaultValues: createDefaultValues(),
  });
  
  const [isUploadDocument, setIsUploadDocument] = useState(true);
  const [isUploadText, setIsUploadText] = useState(false);
  const selectedReferenceIds = methods.watch("selectedReferences", []);
  const similarityThreshold = methods.watch("similarityThreshold", 75);
  const citationStrategy = methods.watch("citationStrategy", "balanced");
  const headerTitle = isUploadDocument
    ? "Upload Your Document"
    : "Enter Your Text";
  const headerSubtitle = isUploadDocument
    ? "Upload your academic paper for citation analysis"
    : "Paste your paragraph or text for citation analysis";

  const onClickDocument = () => {
    setIsUploadDocument(true);
    setIsUploadText(false);
    methods.reset(createDefaultValues());
  };

  const onClickText = () => {
    setIsUploadDocument(false);
    setIsUploadText(true);
    methods.reset(createDefaultValues());
  };

  const onSubmit: SubmitHandler<LLMRequestData> = (data) => {
    console.log("Submitting document for analysis...", data);
  };

  useEffect(() => {
    methods.register("similarityThreshold");
    methods.register("citationStrategy");
    methods.register("selectedReferences");
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
            <div className="flex gap-4 justify-center items-center">
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
            </div>

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
                      required: "Please upload a document to analyze",
                    }}
                  />
                )}
                {isUploadText && (
                  <div>
                    <textarea
                      id="paragraph"
                      rows={8}
                      placeholder="Paste your academic text here for citation analysis..."
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm h-[12rem] border border-black/30 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
                      {...methods.register("paragraph", {
                        required: "Please enter some text to analyze",
                        minLength: {
                          value: 10,
                          message: "Text must be at least 10 characters long",
                        },
                      })}
                    />
                    {methods.formState.errors.paragraph && (
                      <p className="mt-2 text-sm text-red-600">
                        {methods.formState.errors.paragraph.message}
                      </p>
                    )}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transform transition-all ease-in-out duration-400 px-6 py-3"
                >
                  Analyze Citations
                </Button>

                <div className="grid gap-4 md:grid-cols-2">
                  <CardController
                    id="similarity-threshold"
                    type="range"
                    title="Similarity Threshold"
                    description="Set the minimum match percentage before a citation is flagged."
                    helperText="Higher values demand closer matches."
                    min={50}
                    max={100}
                    step={1}
                    unit="%"
                    value={similarityThreshold}
                    onChange={(value) =>
                      methods.setValue("similarityThreshold", value, {
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
                    value={citationStrategy}
                    onChange={(value) =>
                      methods.setValue("citationStrategy", value, {
                        shouldDirty: true,
                        shouldTouch: true,
                      })
                    }
                    options={[
                      { value: "llama-2", label: "LLaMA 2" },
                      { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
                      { value: "gpt-4", label: "GPT-4" },
                    ]}
                  />
                </div>

                <ReferenceDatabase
                  catalog={referenceCatalog}
                  selectedIds={selectedReferenceIds}
                  onSelectionChange={(ids) =>
                    methods.setValue("selectedReferences", ids, {
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
