import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ "application/pdf": { maxFileSize: "32MB" } }) // ✅ use correct MIME type
    .middleware(async () => {
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

      return { userId: metadata.userId, file };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
