import { createUploadthing, type FileRouter } from "uploadthing/next";


const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB" } })
        .middleware(async ({ }) => {
            return {};
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete ");
            console.log("file url", file.url);
            return { uploaded: true };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;