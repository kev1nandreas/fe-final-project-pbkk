"use client";

import Button from "@/components/ui/Button";
import Upload from "@/components/ui/Upload";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { LLMRequestData } from "@/types/request";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

export default function UploadDocument({ onSubmit }: { onSubmit: SubmitHandler<LLMRequestData> }) {
    const methods = useForm<LLMRequestData>();
    return (
        <div className="bg-white/10 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/5 shadow-2xl border border-white/30 rounded-2xl p-8 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none relative">
            {/* Header */}
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
                Upload Your Document
            </h2>

            <p className="text-gray-600">
                Upload your academic paper for citation analysis
            </p>
            </div>

            {/* Upload Section */}
            <div className="relative z-10">
            <FormProvider {...methods}>
                <form action="" onSubmit={methods.handleSubmit(onSubmit)}>
                <Upload
                    id="document"
                    accept=".pdf,.doc,.docx,.txt"
                    maxSize={5}
                    placeholder="Drop your academic paper here or click to browse"
                    className="w-full"
                />

                <Button
                    type="submit"
                    className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transform transition-all ease-in-out duration-400 px-6 py-3"
                >
                    Analyze Citations
                </Button>
                </form>
            </FormProvider>
            </div>
        </div>
    );
}