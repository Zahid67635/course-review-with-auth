import { z } from "zod";

export const UserValidationSchema = z.object({
    username: z.string(),
    password: z.string().min(8),
    email: z.string(),
    role: z.enum(['user', 'admin'])
});

export const ChangePasswordValidationSchema = z.object({
    currentPassword: z.string().min(8),
    newPassword: z.string({ required_error: "Password has to be min 8 characters" }).min(8)
})


export const loginValidationSchema = z.object({
    username: z.string({ required_error: 'username is required' }),
    password: z.string({ required_error: 'password is required' }).min(8),
});