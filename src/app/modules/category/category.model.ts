import { Schema, model } from "mongoose";
import { TCategory } from "../common.interface";

const CategorySchema = new Schema<TCategory>({
    name: { type: String, required: true, unique: true },
});

export const CategoryModel = model<TCategory>('Category', CategorySchema);