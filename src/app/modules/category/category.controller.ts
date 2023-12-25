import { NextFunction, Request, Response } from "express"
import { categoryServices } from "./category.service"
import { CategoryValidationSchema } from "./category.validation"


const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = req.body
        const zodData = CategoryValidationSchema.parse(category)
        const result = await categoryServices.createCategoryIntoDB(zodData)
        res.status(200).json({
            success: true,
            statusCode: 201,
            message: `category created successfully!`,
            data: result
        })
    }
    catch (error) {
        next(error)
    }
}

const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await categoryServices.getCategoriesFromDB()
        res.status(200).json({
            success: true,
            statusCode: 201,
            message: `category retrieved successfully!`,
            data: result
        })
    } catch (error) {
        next(error)
    }
}
export const categoryControllers = {
    createCategory, getCategories
}
