import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createAUserIntoDB = async (payload: TUser) => {
    if (await UserModel.isExistUser(payload.email)) {
        throw new Error('User is already exists!')
    }
    const result = await UserModel.create(payload);
    return result;

}
export const userServices = {
    createAUserIntoDB
}