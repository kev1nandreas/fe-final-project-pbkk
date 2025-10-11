"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { LLMRequestDataDocs, LLMRequestDataText } from "@/types/request";
import { SubmitHandler } from "react-hook-form";
import UploadDocument from "@/components/layout/upload-document";
import UploadText from "@/components/layout/upload-text";
import Button from "@/components/ui/Button";

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
  const [isUploadDocument, setIsUploadDocument] = useState(true);
  const [isUploadText, setIsUploadText] = useState(false);
  const [hasSubmitDocument, setHasSubmitDocument] = useState(false);
  const [hasSubmitText, setHasSubmitText] = useState(false);
  const isLargeScreen = useIsLargeScreen();
  const headerTitle = isUploadDocument ? "Upload Your Document" : "Enter Your Text";
  const headerSubtitle = isUploadDocument
    ? "Upload your academic paper for citation analysis"
    : "Paste your paragraph or text for citation analysis";
  
  const onClickDocument = () => {
    setIsUploadDocument(true);
    setIsUploadText(false);
    setHasSubmitDocument(false);
    setHasSubmitText(false);
  }

  const onClickText = () => {
    setIsUploadDocument(false);
    setIsUploadText(true);
    setHasSubmitDocument(false);
    setHasSubmitText(false);
  }

  const onSubmitDocument: SubmitHandler<LLMRequestDataDocs> = (data) => {
    setHasSubmitDocument(true);
    console.log("Submitting document for analysis...", data);
  };

  const onSubmitText: SubmitHandler<LLMRequestDataText> = (data) => {
    setHasSubmitText(true);
    console.log("Submitting text for analysis...", data);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">

      {/* Upload Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20, maxWidth: "42rem" }}
        animate={{ 
          opacity: 1,
          y: 0, 
          x: 0,
          maxWidth: "42rem" 
        }}
        transition={{ 
          duration: 0.3, 
          x: {type: "spring", stiffness:300, damping:30, mass: 0.5},
          maxWidth: { type: "tween", duration: 0.3, ease: "anticipate" } 
        }}
        className={`w-full max-w-2xl mx-auto px-4`}>
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
            <p className="text-gray-600">
              {headerSubtitle}
            </p>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex gap-4 justify-center items-center">
              <Button type="button" className={`${isUploadDocument ? 'bg-blue-400' : 'bg-gray-400'} w-[12rem]`} onClick={onClickDocument}>Upload Document</Button>
              <Button type="button" className={`${isUploadText ? 'bg-blue-400' : 'bg-gray-400'} w-[12rem]`} onClick={onClickText}>Upload Text</Button>
            </div>

            {isUploadDocument && <UploadDocument onSubmit={onSubmitDocument} />}
            {isUploadText && <UploadText onSubmit={onSubmitText} />}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
