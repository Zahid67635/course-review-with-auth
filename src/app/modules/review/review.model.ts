import { Schema, model } from "mongoose";
import { TCourseModel, TReview } from "../common.interface";
import { CourseModel } from "../course/course.model";

const ReviewSchema = new Schema<TReview, TCourseModel>({
    courseId: { type: Schema.Types.ObjectId, required: [true, 'CourseId is required'], ref: 'Course' },
    rating: { type: Number, required: [true, 'Rating is required'] },
    review: { type: String, required: [true, 'Review is required'] },
});

ReviewSchema.statics.isValidCourseId = async (id: string) => {
    const isValid = await CourseModel.findOne({ _id: id })
    return isValid
}
export const ReviewModel = model<TReview, TCourseModel>('Review', ReviewSchema);