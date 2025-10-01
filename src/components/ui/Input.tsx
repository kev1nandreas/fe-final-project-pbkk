"use client";

import { useState } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function Input({
  id,
  label,
  type = "text",
  placeholder,
  validation,
  className,
  min,
  max,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  validation?: RegisterOptions;
  className?: string;
  min?: string;
  max?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[id]?.message as string | undefined;

  return (
    <div className={`flex flex-col`}>
      <label>{label}</label>
      <div className="relative mt-1">
        <input
          id={id}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          min={min}
          max={max}
          {...register(id, validation)}
          className={`block w-full px-3 py-2 border rounded-md focus:outline-none ${
            error
              ? "border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:ring-2"
          } ${className}`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer"
          >
            {showPassword ? <HiEye /> : <HiEyeOff />}
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}