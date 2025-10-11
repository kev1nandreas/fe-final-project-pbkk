"use client";

import Button from "@/components/ui/Button";
import Upload from "@/components/ui/Upload";
import { LLMRequestDataDocs } from "@/types/request";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

export default function UploadDocument({ onSubmit }: { onSubmit: SubmitHandler<LLMRequestDataDocs> }) {
    const methods = useForm<LLMRequestDataDocs>();
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                <Upload
                    id="document"
                    accept=".pdf,.doc,.docx,.txt"
                    maxSize={5}
                    placeholder="Drop your academic paper here or click to browse"
                    className="w-full"
                />

                <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transform transition-all ease-in-out duration-400 px-6 py-3"
                >
                    Analyze Citations
                </Button>
            </form>
        </FormProvider>
    );
}