import { z } from "zod";

// Define Zod validation schema
const createRegisterSchema = z.object({
  body: z.object({
    name: z
      .string({message:'Validation error'}),
     
    email: z
      .string()
      .regex(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        { message: "Validation error" }
      ),
    password: z
      .string({message:'Validation error'}),
  }),
});

export const zodValidation = {
  createRegisterSchema,
};
