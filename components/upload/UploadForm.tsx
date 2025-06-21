"use client";

import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./UploadFormInput";
import { z } from "zod";
import { toast } from "sonner";
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

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
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      toast.success("🎉 Upload completed successfully!");
    },
    onUploadError: (err) => {
      toast.error(`❌ Upload failed: ${err.message || "An error occurred"}`);
    },
    onUploadBegin: () => {
      toast.loading(`📤 Uploading`);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      const result = schema.safeParse({ file });

      if (!result.success) {
        const errorMsg =
          result.error.flatten().fieldErrors.file?.[0] || "Invalid file";

        toast.warning(errorMsg);
        setIsLoading(false);
        return;
      }

      toast.info("Processing PDF", {
        description: "Hang Tight!",
      });

      const response = await startUpload([file]);

      if (!response || response.length === 0) {
        toast.error("Upload failed or returned empty response.");
        setIsLoading(false);
        return;
      }

      const summary = await generatePdfSummary(response);
      console.log({ summary });

      const { data = null } = summary || {};

      if (data) {
        let storeResult: any;
        toast.success("📝 Summary created and PDF saved!");
        if (data.summary) {
          storeResult = await storePdfSummaryAction({
            summary: data.summary,
            fileUrl: response[0].serverData.file.url,
            title: data.title,
            fileName: file.name,
          });
          //save the summary to the database.
          toast.success("Summary Generated !");
          formRef.current?.reset();
          //redirect to the [id] summary page.
          router.push(`/summaries/${storeResult.id}`);
        }
        // Optionally: save to DB here
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Something went wrong during the upload.");
      formRef.current?.reset();
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
