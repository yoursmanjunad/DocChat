"use client";

import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./UploadFormInput";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((file) => file.size <= 24 * 1024 * 1024, {
      message: "File must be under 24MB",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed",
    }),
});

export default function UploadForm() {
  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      toast.success("🎉 Upload completed successfully!");
    },
    onUploadError: (err) => {
      toast.error(`❌ Upload failed: ${err.message || "An error occurred"}`);
    },
    onUploadBegin: (file) => {
      toast.loading(`📤 Uploading`);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    const result = schema.safeParse({ file });

    if (!result.success) {
      const errorMsg =
        result.error.flatten().fieldErrors.file?.[0] || "Invalid file";

      toast.warning(` ${errorMsg}`);
      return;
    }
    toast.info("Processing PDF", {
      description: "Hang Tight!",
    });

    try {
      const response = await startUpload([file]);

      if (!response) {
        throw new Error("Upload service is currently unavailable");
      }
    } catch (error: any) {
      toast.error(
        `💥 Upload failed: ${error.message || "An unexpected error occurred"}`
      );
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
