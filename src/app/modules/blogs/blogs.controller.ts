import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BlogService } from "./blogs.service";
import httpstatus from 'http-status-codes'

const createBlog = catchAsync(async(req,res)=>{
  const result = await BlogService.createBlogIntoDB(req.body)

  sendResponse(res,{
    statusCode: httpstatus.OK,
    success:true,
    message:"Blogs Created Successfully",
    data:result
  })
})

export const BlogController = {
  createBlog
}