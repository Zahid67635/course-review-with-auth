import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";
import { calculateDurationInWeeks, filter } from "./course.utils";

const createCourseIntoDB = async (course: TCourse) => {
    if (await CourseModel.isValidCategoryId(course.categoryId)) {
        const result = await CourseModel.create(course);
        return result;
    }
    throw new Error('CategoryId not exists')

}

const getAllCourseFromDB = async (query: Record<string, unknown>) => {

    const filteredData = filter(CourseModel.find(), query)
    if (query.sortBy && query.sortOrder) {
        const sortBy = query.sortBy
        const sortOrder = query.sortOrder
        const sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`
        filteredData.sort(sortStr)

    }
    if (query.page || query.limit) {
        const page = Number(query.page) || 1
        const limit = Number(query.limit) || 10
        const skip = (page - 1) * limit
        filteredData.skip(skip).limit(limit)
    }
    else {
        filteredData.skip(0).limit(10)
    }
    const result = await filteredData
    return result

}
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
    const { details, ...rest } = payload
    let durationInWeeks;
    if (payload.endDate) {
        const data = await CourseModel.findById(id)
        if (data?.startDate) {
            durationInWeeks = calculateDurationInWeeks(data.startDate, payload.endDate)
        }
    }
    const updatedFields = {
        "details.level": details?.level,
        "details.description": details?.description,
        durationInWeeks,
        ...rest
    };

    const updatedBasicCourseInfo = await CourseModel.findByIdAndUpdate(
        id,
        { $set: updatedFields },
        {
            new: true,
            upsert: true,
            runValidators: true,
        },
    );

    if (!updatedBasicCourseInfo) {
        throw new Error('Failed to update');
    }
    return updatedBasicCourseInfo
}
export const courseServices = {
    createCourseIntoDB, getAllCourseFromDB, updateCourseIntoDB
}