import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseFormData(data: any) {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
}

export function formatReadableTime(isoTimestamp: string, locale = "en-US") {
  const normalized = isoTimestamp.replace(/(\.\d{3})\d+/, "$1");
  const date = new Date(normalized);

  if (Number.isNaN(date.getTime())) return isoTimestamp;

  const datePart = date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const timePart = date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${datePart} • ${timePart}`;
}

export function trimLongText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
};