import { Model, Types } from "mongoose"

export type TCategory = {
    name: string
}
export type TReview = {
    courseId: Types.ObjectId,
    rating: number,
    review: string
}

export interface TCourseModel extends Model<TReview> {
    isValidCourseId(id: string): Promise<TReview | null>;
}