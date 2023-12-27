import mongoose from "mongoose";
import { z } from "zod";

export const CategoryValidationSchema = z.object({
    name: z.string().min(2),
    createdBy: z.instanceof(mongoose.Types.ObjectId).optional()
});