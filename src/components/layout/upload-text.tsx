"use client";

import Button from "@/components/ui/Button";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface UploadTextData {
  paragraph: string;
}

export default function UploadText({ onSubmit }: { onSubmit: SubmitHandler<UploadTextData> }) {
  const methods = useForm<UploadTextData>();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="paragraph" className="block text-sm font-medium text-gray-700 mb-2">
            Text Content
          </label>
          <textarea
            id="paragraph"
            rows={8}
            placeholder="Paste your academic text here for citation analysis..."
            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-black/30 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
            {...methods.register("paragraph", {
              required: "Please enter some text to analyze",
              minLength: {
                value: 10,
                message: "Text must be at least 10 characters long"
              }
            })}
          />
          {methods.formState.errors.paragraph && (
            <p className="mt-2 text-sm text-red-600">
              {methods.formState.errors.paragraph.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transform transition-all ease-in-out duration-400 px-6 py-3"
        >
          Analyze Text Citations
        </Button>
      </form>
    </FormProvider>
  );
}