import { Schema, model } from "mongoose";
import { TCategory } from "../common.interface";

const CategorySchema = new Schema<TCategory>({
    name: { type: String, required: true, unique: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export const CategoryModel = model<TCategory>('Category', CategorySchema);