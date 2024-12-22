import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogService } from "./blog.service";


const blogCreate = catchAsync(async (req, res) => {
    const data = req.body;
    const user = req.user
    if (!data) throw new Error("Invalid Body Information")
    const result = await BlogService.createBlogIntoDB(data, user)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Blog created successfully",
        data: result
    })

})
const getBlog = catchAsync(async (req, res) => {
    const query = req.query
    const user = req.user;
    const result = await BlogService.getBlogIntoDB(query, user)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Blogs fetched successfully",
        data: result
    })

})
const blogUpdate = catchAsync(async (req, res) => {
    const data = req.body;
    const { Id } = req.params;
    const user = req.user
    if (!data || !Id) throw new Error("Invalid Body Information")
    const result = await BlogService.updateBlogIntoDB(data, Id, user)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Blog updated successfully",
        data: result
    })

})
const blogDelete = catchAsync(async (req, res) => {
    const { Id } = req.params;
    const user = req.user
    if (!Id || !user) throw new Error("Invalid Body Information")
    const result = await BlogService.deleteBlogIntoDB(Id, user)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Blog deleted successfully",
        data: result
    })

})

export const blogController = { blogCreate, blogUpdate, blogDelete, getBlog }