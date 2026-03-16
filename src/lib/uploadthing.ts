import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"

const f = createUploadthing()

const auth = (req: Request) => ({ id: "fakeId" }) // Fake auth function for now

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Image uploader for product images
  productImageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req)

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized")

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.url }
    }),

  // Avatar uploader for user profiles
  avatarUploader: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const user = await auth(req)
      if (!user) throw new UploadThingError("Unauthorized")
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.url }
    }),

  // Review image uploader
  reviewImageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
    .middleware(async ({ req }) => {
      const user = await auth(req)
      if (!user) throw new UploadThingError("Unauthorized")
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.url }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
