import { Model } from "mongoose";

export type TUser = {
    username: string,
    email: string,
    password: string,
    role: 'user' | 'admin'
}

export interface TUserModel extends Model<TUser> {
    isExistUser(email: string): Promise<TUser | null>;
}