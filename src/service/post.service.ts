import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose"
import Post, { PostDocument } from "../model/post.model"

export async function createPost(input: DocumentDefinition<PostDocument>) {
    try {
        return await Post.create(input)
    }
    catch (error) {
        throw error
    }
}

export async function findPost(
    query: FilterQuery<PostDocument>,
    options: QueryOptions = { lean: true }
) {
    return await Post.findOne(query, {}, options)
}

export async function findAndUpdate(
    query: FilterQuery<PostDocument>,
    update: UpdateQuery<PostDocument>,
    options: QueryOptions
) {
    return await Post.findOneAndUpdate(query, update, options)
}


export async function deletePost(
    query: FilterQuery<PostDocument>
) {
    return await Post.deleteOne(query)
}