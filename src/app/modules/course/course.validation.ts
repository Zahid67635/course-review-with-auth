import mongoose from "mongoose";
import { z } from "zod";

const TagSchema = z.object({
    name: z.string().min(2),
    isDeleted: z.boolean(),
});

export const CourseSchemaValidation = z.object({
    title: z.string().min(2),
    instructor: z.string().min(2),
    categoryId: z.string().min(2),
    price: z.number().positive(),
    tags: z.array(TagSchema),
    durationInWeeks: z.number().optional(),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string().min(2),
    provider: z.string().min(2),
    details: z.object({
        level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
        description: z.string().min(2),
    }),
    createdBy: z.instanceof(mongoose.Types.ObjectId).optional()
});