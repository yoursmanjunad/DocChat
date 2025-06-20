import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
      const user = await currentUser();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("✅ Upload callback triggered");
      console.log("🧾 Metadata:", metadata);
      console.log("📄 File:", file);

      if (!metadata.userId) {
        throw new UploadThingError("Missing userId in metadata");
      }

      // Don't return anything - just log or process the data
      console.log(`File uploaded for user: ${metadata.userId}`);
      console.log(`File URL: ${file.url}`);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
