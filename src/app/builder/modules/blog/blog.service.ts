
import httpStatus from 'http-status-codes'
import { TBlog } from "./blog.interface"
import { BlogModel } from "./blog.model"
import { JwtPayload } from "jsonwebtoken" 
import AppError from '../../../../error/app.error'
import QueryBuilder from '../../QueryBuilder'

const createBlogIntoDB = async (payload: TBlog, user: JwtPayload) => {
    const userData = user._doc;
    payload.author = userData?._id;
    const result = await BlogModel.create(payload)
    if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid User Infomation")
    const populatedResult = await result.populate('author');

    return populatedResult;
}
const getBlogIntoDB = async (query: Record<string, unknown>, user: JwtPayload) => {
    // blog filed 
    let filter = {}
    const { _id, role } = user._doc;
    if (role === 'admin') {
        filter = {}
    } else {
        filter = { author: _id }
    }
    const blogSearchFileds = ['title', 'content']
    const blogQuery = new QueryBuilder(BlogModel.find(filter), query)
        .search(blogSearchFileds)
        .filter()
        .sort()
    const result = blogQuery.modelQuery.populate('author')
    return result;
}

const updateBlogIntoDB = async (payload: Partial<TBlog>, Id: string, user: JwtPayload) => {
    let filter = {}
    const { _id, role } = user._doc;
    if (role === 'admin') {
        filter = { _id: Id }
    } else {
        filter = { _id: Id, author: _id }
    }
    const result = await BlogModel.findOneAndUpdate(filter, payload, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid User Infomation")
    return result;
}

const deleteBlogIntoDB = async (Id: string, user: JwtPayload) => {
    let filter = {}
    const { _id, role } = user._doc;
    if (role === 'admin') {
        filter = { _id: Id }
    } else {
        filter = { _id: Id, author:_id }
    }


    const result = await BlogModel.deleteOne(filter);
    if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid Delete Infomation")
    return result;
}


export const BlogService = {
    createBlogIntoDB,
    updateBlogIntoDB,
    deleteBlogIntoDB,
    getBlogIntoDB

}