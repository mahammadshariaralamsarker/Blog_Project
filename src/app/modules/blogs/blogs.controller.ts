import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { Blog } from "./blogs.model";
import { BlogService } from "./blogs.service";
import httpstatus from 'http-status-codes'

const createBlog = catchAsync(async(req,res)=>{
  const result = await BlogService.deleteBlog(req.body)

  sendResponse(res,{
    statusCode: httpstatus.OK,
    success:true,
    message:"Blog created successfully",
    data:result
  })
})

const deleteBlog = catchAsync (async (req,res) =>{
  const {id} = req.params;
   await Blog.findByIdAndDelete(id)
   res.status(200).json({
    message: "Blog deleted successfully",
      success: true,
       statusCode : 200
   })
})

const updateBlog = catchAsync(async(req,res)=>{
  const {id} = req.params;
  const results = await BlogService.updateBlog(id,req.body)
  const result = {
    title:results?.title,
    content:results?.content
  }
  res.send(result)
})

export const BlogController = {
  createBlog,deleteBlog,updateBlog
}