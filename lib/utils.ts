import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileName(fileUrl: string): string {
  try {
    const parts = fileUrl.split("/");
    const rawFileName = parts[parts.length - 1];
    const cleanName = rawFileName
      .replace(/[-_]/g, " ") // replace dashes/underscores with space
      .replace(/\.[^/.]+$/, "") // remove file extension
      .replace(/\s+/g, " ") // collapse multiple spaces
      .trim();

    return cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
  } catch (error) {
    return "Untitled Document";
  }
}
