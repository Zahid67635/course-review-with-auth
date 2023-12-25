import { z } from "zod";

export const CategoryValidationSchema = z.object({
    name: z.string().min(2)
});