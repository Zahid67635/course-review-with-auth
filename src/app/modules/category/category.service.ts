import { TCategory } from "../common.interface";
import { CategoryModel } from "./category.model";

const createCategoryIntoDB = async (category: TCategory) => {
    const result = await CategoryModel.create(category);
    return result;
}
const getCategoriesFromDB = async () => {
    const result = CategoryModel.find({})
    return result
}
export const categoryServices = {
    createCategoryIntoDB, getCategoriesFromDB
}