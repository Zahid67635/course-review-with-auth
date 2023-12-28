import { Model, Types } from "mongoose";

type TPreviousPasswords = {
    password: string,
}

export type TUser = {
    _id?: Types.ObjectId
    username: string,
    email: string,
    password: string,
    role: 'user' | 'admin',
    previousPasswords?: TPreviousPasswords[]
}
export type TLogin = {
    username: string,
    password: string
}

export type TPassword = {
    currentPassword: string,
    newPassword: string
}

export type TPasswords = {
    password: string,
}

export interface TUserModel extends Model<TUser> {
    isExistUser(username: string): Promise<TUser | null>;
}