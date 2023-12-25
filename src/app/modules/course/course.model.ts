import { Schema, model } from "mongoose";
import { TCategoryModel, TCourse, TTag } from "./course.interface";
import { CategoryModel } from "../category/category.model";


const TagSchema = new Schema<TTag>({
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false, required: true },
});

const CourseSchema = new Schema<TCourse, TCategoryModel>({
    title: { type: String, required: true, unique: true },
    instructor: { type: String, required: true },
    categoryId: { type: String, required: [true, 'CourseId is required'] },
    price: { type: Number, required: true },
    tags: [TagSchema],
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    durationInWeeks: { type: Number },
    details: {
        level: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced'],
            required: true,
        },
        description: { type: String, required: true },
    },
});

CourseSchema.statics.isValidCategoryId = async (id: string) => {
    const isValid = await CategoryModel.findOne({ _id: id })
    return isValid
}

export const CourseModel = model<TCourse, TCategoryModel>('Course', CourseSchema);