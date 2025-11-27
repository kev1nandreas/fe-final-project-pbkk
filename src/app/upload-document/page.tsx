"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UploadModal from "@/components/ui/UploadModal";

export default function UploadPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    router.push("/citation-checker/analyze");
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <UploadModal
        isOpen={isOpen}
        onClose={handleClose}
        allowSkip={true}
        skipHandler={handleClose}
        showBackdrop={false} // No backdrop for standalone page
      />
    </div>
  );
}
