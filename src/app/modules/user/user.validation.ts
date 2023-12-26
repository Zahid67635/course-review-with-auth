import { z } from "zod";

export const UserValidationSchema = z.object({
    username: z.string(),
    password: z.string().min(8),
    email: z.string(),
    role: z.enum(['user', 'admin'])
});

export const loginValidationSchema = z.object({
    username: z.string({ required_error: 'username is required' }),
    password: z.string({ required_error: 'password is required' }).min(8),
});