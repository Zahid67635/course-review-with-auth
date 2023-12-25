/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type TTag = {
    name: string;
    isDeleted: boolean;
}

export type TCourse = {
    title: string;
    instructor: string;
    categoryId: string;
    price: number;
    tags: TTag[];
    startDate: string;
    endDate: string;
    language: string;
    provider: string;
    durationInWeeks?: number;
    details: {
        level: 'Beginner' | 'Intermediate' | 'Advanced';
        description: string;
    };
}

export interface TCategoryModel extends Model<TCourse> {
    isValidCategoryId(id: string): Promise<TCourse | null>;
}