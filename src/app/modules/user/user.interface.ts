import { Model, Types } from "mongoose";

export type TUser = {
    _id?: Types.ObjectId
    username: string,
    email: string,
    password: string,
    role: 'user' | 'admin'
}
export type TLogin = {
    username: string,
    password: string
}

export interface TUserModel extends Model<TUser> {
    isExistUser(username: string): Promise<TUser | null>;
}