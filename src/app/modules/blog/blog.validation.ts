import { z } from 'zod'
export const createBlogValidationSchema = z.object(
    {
        body: z.object({
            title: z.string().min(5, { message: "Must be 5 or more characters long" }).max(50, { message: 'Must be 20 or end charactes long' }),
            content: z.string().min(10, { message: "Must be 10 or more characters long" }).max(500, { message: 'Must be 500 or end charactes long' }),
            isPublished: z.boolean().default(true)
        })
    }
)
export const updateBlogValidationSchema = z.object(
    {
        body: z.object({
            title: z.string().min(5, { message: "Must be 5 or more characters long" }).max(50, { message: 'Must be 20 or end charactes long' }).optional(),
            content: z.string().min(10, { message: "Must be 10 or more characters long" }).max(500, { message: 'Must be 500 or end charactes long' }).optional(),
            isPublished: z.boolean().default(true).optional()
        })
    }
)