"use client";

import { truncateString } from "@/lib/utils";
import { useState, useRef, useCallback, memo } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

interface UploadProps {
  id: string;
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  validation?: RegisterOptions;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const FileItem = memo(
  ({
    file,
    index,
    onRemove,
  }: {
    file: File;
    index: number;
    onRemove: (index: number) => void;
  }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
      <div className="flex items-center space-x-3">
        <FiUploadCloud />
        <div>
          <p className="text-sm font-medium text-gray-900 ">{truncateString(file.name, 60)}</p>
          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(index);
        }}
        className="text-red-500 hover:text-red-700 transition-colors duration-200 text-xl"
      >
        <RxCross2 />
      </button>
    </div>
  )
);

FileItem.displayName = "FileItem";

export default function Upload({
  id,
  label,
  accept,
  multiple = false,
  maxSize = 10,
  className = "",
  disabled = false,
  placeholder = "Click to upload or drag and drop",
  validation,
}: UploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const maxSizeBytes = maxSize * 1024 * 1024;

  const {
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  // Register the field manually
  const { ref: registerRef, ...registerRest } = useFormContext().register(id, validation);
  
  // Combine refs
  const combinedRef = useCallback(
    (el: HTMLInputElement | null) => {
      inputRef.current = el;
      registerRef(el);
    },
    [registerRef]
  );

  // Get error message
  const error = errors[id];
  const errorMessage = error?.message as string | undefined;

  const validateFileType = useCallback(
    (file: File): boolean => {
      if (!accept) return true;

      const fileName = file.name.toLowerCase();
      const fileType = file.type.toLowerCase();
      const acceptedTypes = accept.toLowerCase().split(",").map((t) => t.trim());

      return acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          return fileName.endsWith(type);
        }
        if (type.includes("*")) {
          const [category] = type.split("/");
          return fileType.startsWith(category + "/");
        }
        return fileType === type;
      });
    },
    [accept]
  );

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;

      const validFiles: File[] = [];
      const filesArray = Array.from(fileList);

      for (const file of filesArray) {
        if (!validateFileType(file)) {
          alert(
            `File "${file.name}" has an unsupported format. Accepted formats: ${accept}`
          );
          continue;
        }

        if (file.size <= maxSizeBytes) {
          validFiles.push(file);
        } else {
          alert(`File "${file.name}" is too large. Maximum size is ${maxSize}MB.`);
        }
      }

      const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(updatedFiles);

      // Create a FileList-like object for React Hook Form
      const dataTransfer = new DataTransfer();
      updatedFiles.forEach((file) => dataTransfer.items.add(file));
      setValue(id, dataTransfer.files, {
        shouldValidate: true,
        shouldDirty: true,
      });
      trigger(id);
    },
    [id, maxSize, maxSizeBytes, multiple, accept, validateFileType, setValue, files, trigger]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
    },
    [handleFiles]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (!disabled) handleFiles(e.dataTransfer.files);
    },
    [disabled, handleFiles]
  );

  const handleClick = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);

      // Update React Hook Form
      const dataTransfer = new DataTransfer();
      newFiles.forEach((file) => dataTransfer.items.add(file));
      setValue(id, dataTransfer.files, {
        shouldValidate: true,
        shouldDirty: true,
      });
      trigger(id);
    },
    [files, id, setValue, trigger]
  );

  const uploadAreaClasses = `
    relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer h-[12rem]
    transition-all duration-200 ease-in-out
    ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}
    ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "hover:bg-gray-50"}
    ${errorMessage ? "border-red-300 bg-red-50" : ""}
  `;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div
        className={uploadAreaClasses}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={combinedRef}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...registerRest}
          onChange={handleChange}
          className="hidden"
        />

        <div className="mx-auto mb-4 flex items-center justify-center">
          <FiUploadCloud className="w-12 h-12 text-gray-400" />
        </div>

        <div className="text-gray-600">
          <p className="text-lg font-medium mb-1">{placeholder}</p>
          {accept && <p className="text-sm">Supported formats: {accept}</p>}
          <p className="text-xs text-gray-500 mt-1">Maximum file size: {maxSize}MB</p>
        </div>
      </div>

      {errorMessage && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-gray-700">
            Uploaded Files ({files.length})
          </p>
          {files.map((file, index) => (
            <FileItem
              key={`${file.name}-${file.size}-${index}`}
              file={file}
              index={index}
              onRemove={removeFile}
            />
          ))}
        </div>
      )}
    </div>
  );
}