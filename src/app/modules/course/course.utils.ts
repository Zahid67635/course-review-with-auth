import { Query } from 'mongoose'

export const calculateDurationInWeeks = (startDate: string, endDate: string): number => {
    const perDay = 1000 * 60 * 60 * 24;
    const perWeek = perDay * 7;

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const difference = end - start
    const durationInWeeks = Math.ceil(difference / perWeek);

    return durationInWeeks;
}

type TQueryObj = {
    [key: string]: unknown
    page?: string
    limit?: string
    sortBy?: string
    sortOrder?: string
}

export const filter = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
    let queryObj = { ...query }
    const excludedFields = [
        'page',
        'limit',
        'sortBy',
        'sortOrder',
    ]
    excludedFields.forEach((keyword) => delete queryObj[keyword])

    if (queryObj.level) {
        queryObj = { "details.level": queryObj.level }
    }
    if (queryObj.tags) {
        queryObj = { "tags.name": queryObj.tags, "tags.isDeleted": false }
    }

    modelQuery = modelQuery.find(queryObj)


    return modelQuery
}
