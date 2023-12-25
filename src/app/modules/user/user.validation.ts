import { z } from "zod";

export const UserValidationSchema = z.object({
    username: z.string(),
    password: z.string().min(8),
    email: z.string(),
    role: z.enum(['user', 'admin'])
});