import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const UserSchema = new Schema<TUser>({
    userName: {
        type: String, required: [true, 'UserName is required']
    },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    password: { type: String, required: [true, 'Password is required'], min: 8 },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
})
export const UserModel = model<TUser>('User', UserSchema);