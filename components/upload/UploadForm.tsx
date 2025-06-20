"use client";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./UploadFormInput";
import { z } from "zod";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine((file) => file.size <= 24 * 1024 * 1024, {
      message: "File size must be less than 24MB",
    })
    .refine((file) => file.type.startsWith("application/pdf"), {
      message: "File must be a PDF!",
    }),
});

export default function UploadForm() {
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("error occurred while uploading", err);
    },
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for", file);
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    const validFields = schema.safeParse({ file });
    if (!validFields.success) {
      console.log(
        validFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid File"
      );
      return;
    }
    const resp = await startUpload([file]);
    if (!resp) {
      return;
    }
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
