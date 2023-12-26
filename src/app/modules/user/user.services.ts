/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { TLogin, TUser } from "./user.interface";
import { UserModel } from "./user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from "../../config";

const createAUserIntoDB = async (payload: TUser) => {
    if (await UserModel.isExistUser(payload.username)) {
        throw new Error('User is already exists!')
    }
    const result = await UserModel.create(payload);
    return result;

}
const loginUserFromDB = async (payload: TLogin) => {
    const user = await UserModel.isExistUser(payload.username)
    const isPasswordMatch =
        await bcrypt.compare(payload.password, user?.password as string)
    if (!user) {
        throw new Error('User is not exists!')
    }
    if (!isPasswordMatch) {
        throw new Error('Password is not correct!')
    }
    const jwtPayload = { username: user.email, role: user.role, email: user.email, _id: user._id }
    const token = jwt.sign(jwtPayload, config.ACCESS_SEC_JWT as string, { expiresIn: '10d' })


    return {
        token,
        user: {
            _id: user._id, username: user.username, email: user.email, role: user.role
        }
    }
}
export const userServices = {
    createAUserIntoDB, loginUserFromDB
}