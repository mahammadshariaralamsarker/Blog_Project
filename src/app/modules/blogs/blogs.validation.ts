import { z } from "zod";

 const createZodvalidationSchema = z.object({
  body:z.object({
    title: z
    .string()
    .min(1, { message: "Title is required and cannot be empty" }),
  content: z
    .string()
    .min(1, { message: "Content is required and cannot be empty" }),
  author: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Author must be a valid ObjectId" }),
  })
});
export const zodValidation = {
  createZodvalidationSchema
}