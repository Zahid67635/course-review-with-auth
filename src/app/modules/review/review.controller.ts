import { reviewServices } from "./review.service"
import { NextFunction, Request, Response } from "express"
import { ReviewValidationSchema } from "./review.validation"
import { Types } from "mongoose"


const createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const review = req.body
        const { courseId } = review
        review.courseId = new Types.ObjectId(review.courseId)
        const zodData = ReviewValidationSchema.parse(review)
        const result = await reviewServices.createReviewIntoDB(zodData, courseId)
        res.status(200).json({
            success: true,
            statusCode: 201,
            message: `Review created successfully!`,
            data: result
        })
    }
    catch (error) {
        next(error)
    }
}

const getCourseDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId } = req.params;
        const result = await reviewServices.getCourseDetailsFromDB(courseId)
        res.status(200).json({
            success: true,
            statusCode: 201,
            message: `Course and Reviews retrieved successfully`,
            data: {
                course: result[0]
            }
        })
    } catch (error) {
        next(error)
    }
}

const bestCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await reviewServices.bestCourseInDB()
        res.status(200).json({
            success: true,
            statusCode: 201,
            message: `Course and Reviews retrieved successfully`,
            data: {
                course: result[0]
            }
        })
    } catch (error) {
        next(error)
    }
}

export const reviewControllers = {
    createReview, getCourseDetails, bestCourse
}