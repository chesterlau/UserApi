import User, { UserDocument } from './../model/user.model';
import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";

export async function createUser(input: DocumentDefinition<UserDocument>) {
    try {
        return await User.create(input)
    }
    catch (error) {
        throw error
    }
}

export async function findUser(userId: string) {
    return await User.findById(userId)
}