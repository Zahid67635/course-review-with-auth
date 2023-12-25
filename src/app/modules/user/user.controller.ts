/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { RequestHandler } from "express"
import { UserValidationSchema } from "./user.validation"
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
export const userControllers = {
    createAUser
}