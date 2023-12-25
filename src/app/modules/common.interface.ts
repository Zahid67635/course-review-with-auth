import { Model, Types } from "mongoose"

export type TCategory = {
    name: string,
    createdBy: Types.ObjectId
}
export type TReview = {
    courseId: Types.ObjectId,
    rating: number,
    review: string,
    createdBy: Types.ObjectId
}

export interface TCourseModel extends Model<TReview> {
    isValidCourseId(id: string): Promise<TReview | null>;
}