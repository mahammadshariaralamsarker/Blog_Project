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
const getAllBlog = catchAsync(async(req,res)=>{
   
  const result = await BlogService.getAllBlog(req.query)
  sendResponse(res,{
    statusCode: httpstatus.OK,
    success:true,
    message:"Blogs fetched successfully",
    data:result
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
export const BlogController = {
  blogDelete,createBlog,deleteBlog,updateBlog,getAllBlog
}