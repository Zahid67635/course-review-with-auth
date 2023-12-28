/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { TLogin, TPassword, TUser } from "./user.interface";
import { UserModel } from "./user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from "../../config";

const createAUserIntoDB = async (payload: TUser) => {
    if (await UserModel.isExistUser(payload.username)) {
        throw new Error('User is already exists!')
    }
    const result = (await UserModel.create(payload));
    return result;

}
const loginUserFromDB = async (payload: TLogin) => {
    const user = await UserModel.isExistUser(payload.username)
    if (!user) {
        throw new Error('User is not exists!')
    }
    const isPasswordMatch =
        await bcrypt.compare(payload.password, user.password as string)
    if (!isPasswordMatch) {
        throw new Error('Password is not correct!')
    }
    const jwtPayload = { username: user.username, role: user.role, email: user.email, _id: user._id }
    const token = jwt.sign(jwtPayload, config.ACCESS_SEC_JWT as string, { expiresIn: '10d' })


    return {
        token,
        user: {
            _id: user._id, username: user.username, email: user.email, role: user.role
        }
    }
}

const changePasswordIntoDB = async (payload: TPassword, username: string) => {
    const user = await UserModel.isExistUser(username)
    if (payload.currentPassword === payload.newPassword) {
        throw new Error('Failed,You are giving same password!')
    }
    const isPasswordMatch =
        await bcrypt.compare(payload.currentPassword, user?.password as string)
    const salt = 16
    const hashPassword = bcrypt.hashSync(payload.newPassword, salt);
    const prevPasswords = user?.previousPasswords?.slice(-2) || []

    if (!isPasswordMatch) {
        throw new Error(`Password doesn't match with the previous one!`)
    }
    const matchingArray = await Promise.all(
        prevPasswords.map(async (p) => {
            const result = await bcrypt.compare(payload.newPassword, p?.password as string);
            if (result)
                return true;
        })
    );
    const isValidPass = matchingArray.some(v => v === true)
    if (isValidPass) {
        throw new Error('Password change failed. Ensure the new password is unique and not among the last 2 used (last used on 2023-01-01 at 12:00 PM).')
    }
    const result = await UserModel.findByIdAndUpdate(user?._id,
        {
            $push: { previousPasswords: { password: user?.password } },
            $set: { password: hashPassword }
        },
    ).select({ password: 0, previousPasswords: 0 })

    return result
}

export const userServices = {
    createAUserIntoDB, loginUserFromDB, changePasswordIntoDB
}