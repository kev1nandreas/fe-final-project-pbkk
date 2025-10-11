"use client";

import Button from "@/components/ui/Button";
import Upload from "@/components/ui/Upload";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { LLMRequestData } from "@/types/request";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import UploadDocument from "@/components/layout/upload-document";
import { upload } from "@/services/api/main/call";
import { MAIN_ENDPOINT } from "@/services/api/main/endpoint";
import ReferencesList, { ReferenceItem } from "@/components/ui/ReferencesList";

const useIsLargeScreen = () => {
  const [isLarge, setIsLarge] = useState(false);
  // The only reason we use useState is because 
  // we need to re-render when user decides to be slick
  // and test if the website is responsive (resize the window)
  // ^mf (i hate re-render)
  
  // and also because useEffect runs after initial render
  // (so we still need to use useState)

  useEffect(() => {
    const checkSize = () => setIsLarge(window.innerWidth >= 1024); // lg breakpoint
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);
  
  return isLarge;
};

export default function MainAppPage() {
  const methods = useForm<LLMRequestData>();
  const [hasSubmitDocument, setHasSubmitDocument] = useState(false);
  const [references, setReferences] = useState<ReferenceItem[]>([]);
  const isLargeScreen = useIsLargeScreen();
  
  const onSubmit: SubmitHandler<LLMRequestData> = (data) => {
    // Toggle UI state
    setHasSubmitDocument(true);

    // Build FormData from file field (document)
    const fileList = (data as any).document as FileList | undefined;
    if (!fileList || fileList.length === 0) {
      console.warn("No file provided");
      return;
    }

    const formData = new FormData();
    // Support single file for now; if multiple expected, append all
    formData.append("document", fileList[0]);

    (async () => {
      const res = await upload<{ references?: ReferenceItem[] }>(
        MAIN_ENDPOINT.Documents.Upload,
        formData,
      );

      if (res.OK) {
        // Try common shapes: res.Kind.Results, res.Kind (array), or res.Kind.Results.references
        const kind: any = res.Kind;
        let refs: ReferenceItem[] = [];

        if (kind && Array.isArray((kind as any).Results)) {
          refs = (kind as any).Results;
        } else if (kind && Array.isArray(kind)) {
          refs = kind;
        } else if (kind && (kind as any).Results && Array.isArray((kind as any).Results.references)) {
          refs = (kind as any).Results.references;
        } else if ((res as any).Results && Array.isArray((res as any).Results.references)) {
          refs = (res as any).Results.references;
        }

        // Map to ReferenceItem if necessary
        refs = refs.map((r: any) =>
          typeof r === "string"
            ? { title: r, raw: r }
            : { id: r.id ?? r._id ?? undefined, title: r.title ?? r.name ?? r.raw ?? "Untitled", authors: r.authors, year: r.year, raw: r.raw },
        );

        setReferences(refs);
      } else {
        console.error("Upload failed", res);
      }
    })();
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">

      {/* Upload Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20, maxWidth: "42rem" }}
        animate={{ 
          opacity: 1,
          y: 0, 
          x: hasSubmitDocument && isLargeScreen ? "-10rem" : 0,
          maxWidth: hasSubmitDocument && isLargeScreen ? '28rem' : "42rem" 
        }}
        transition={{ 
          duration: 0.3, 
          x: {type: "spring", stiffness:300, damping:30, mass: 0.5},
          maxWidth: { type: "tween", duration: 0.3, ease: "anticipate" } 
        }}
        className={`w-full max-w-2xl mx-auto px-4`}>
        <UploadDocument onSubmit={onSubmit} />
      </motion.div>
      {hasSubmitDocument && isLargeScreen && (
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, x: {type: "spring", stiffness:300, damping:30, mass: 0.5} }}
          className="w-full max-w-2xl mx-auto px-4 absolute right-0 lg:relative lg:right-auto lg:mx-0 lg:max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/5 shadow-2xl border border-white/30 rounded-2xl p-6 lg:p-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Enter your question:</label>
              <input type="text" className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ask a question about your document..." />
            </div>

            <ReferencesList items={references} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
