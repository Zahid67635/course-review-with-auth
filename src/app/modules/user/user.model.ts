/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { TPasswords, TUser, TUserModel } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";


const prevPasswordSchema = new Schema<TPasswords>({
    password: { type: String },
}, { timestamps: true })

const UserSchema = new Schema<TUser, TUserModel>({
    username: {
        type: String, required: [true, 'UserName is required']
    },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    password: { type: String, required: [true, 'Password is required'], min: 8 },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    previousPasswords: [prevPasswordSchema]
}, {
    timestamps: true
})

UserSchema.statics.isExistUser = async (username: string) => {
    const isValid = await UserModel.findOne({ username })
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