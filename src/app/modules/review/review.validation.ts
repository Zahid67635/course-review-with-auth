import mongoose from "mongoose";
import { z } from "zod";

export const ReviewValidationSchema = z.object({
    courseId: z.instanceof(mongoose.Types.ObjectId),
    rating: z.number().lte(5).positive(),
    review: z.string().min(4)
});