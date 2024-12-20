import { TBlog } from "./blogs.interface";
import { Blog } from "./blogs.model";

const createBlogIntoDB = async (payload:TBlog)=>{
  const result = await Blog.create(payload)
  return result
}

export const BlogService = {
  createBlogIntoDB
}