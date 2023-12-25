/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { TUser, TUserModel } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";

const UserSchema = new Schema<TUser, TUserModel>({
    username: {
        type: String, required: [true, 'UserName is required']
    },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    password: { type: String, required: [true, 'Password is required'], min: 8, select: 0 },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
}, {
    timestamps: true
})

UserSchema.statics.isExistUser = async (email: string) => {
    const isValid = await UserModel.findOne({ email })
    return isValid
}

UserSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
    next()
})
UserSchema.post('save', function (doc, next) {
    const user = doc;
    user.password = ''
    next()
})



export const UserModel = model<TUser, TUserModel>('User', UserSchema);