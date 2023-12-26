/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { RequestHandler } from "express"
import { UserValidationSchema, loginValidationSchema } from "./user.validation"
import { userServices } from "./user.services"

const createAUser: RequestHandler = async (req, res, next) => {
    try {
        const userData = req.body
        const zodData = UserValidationSchema.parse(userData)
        const result = await userServices.createAUserIntoDB(zodData)

        res.status(200).json({
            success: true,
            statusCode: 201,
            message: `User created successfully!`,
            data: result
        })
    }
    catch (error) {
        next(error)
    }
}
const loginUser: RequestHandler = async (req, res, next) => {
    try {
        const userData = req.body
        const zodData = loginValidationSchema.parse(userData)
        const result = await userServices.loginUserFromDB(zodData)

        res.status(200).json({
            success: true,
            statusCode: 201,
            message: `User LoggedIn successfully!`,
            data: result
        })
    }
    catch (error) {
        next(error)
    }
}
export const userControllers = {
    createAUser, loginUser
}