import { NextFunction, Request, RequestHandler, Response } from "express"
import { CourseSchemaValidation } from "./course.validation"
import { courseServices } from "./course.service"
import { calculateDurationInWeeks } from "./course.utils"

const createCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const course = req.body
        const zodData = CourseSchemaValidation.parse(course)
        zodData.durationInWeeks = calculateDurationInWeeks(zodData.startDate, zodData.endDate)
        const result = await courseServices.createCourseIntoDB(zodData)
        res.status(200).json({
            success: true,
            statusCode: 201,
            message: `Course created successfully!`,
            data: result
        })
    }
    catch (error) {
        next(error)
    }
}
const getAllCourses: RequestHandler = async (req, res, next) => {
    const result = await courseServices.getAllCourseFromDB(req.query);
    try {
        if (result.length == 0) {
            throw new Error('No Data Found!')
        }
        res.status(200).json({
            success: true,
            statusCode: 201,
            message: `Course retrieved successfully!`,
            data: result
        })
    } catch (error) {
        next(error)
    }

};
const updateCourse: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await courseServices.updateCourseIntoDB(id, req.body);

        res.status(200).json({
            success: true,
            statusCode: 201,
            message: `Course updated successfully!`,
            data: result
        })
    } catch (error) {
        next(error)
    }
};
export const courseControllers = {
    createCourse, getAllCourses, updateCourse
}
