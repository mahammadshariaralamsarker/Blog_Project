import { model, Schema } from "mongoose";
import { TBlog } from "./blogs.interface";

const blogSchema = new Schema <TBlog>(
  {
    title:{
      type:String,
      required:true
    },
    content:{
      type:String,
      required:true  
    },
    author:{
      type:Schema.Types.ObjectId,
      required:true
    }
  },
  {
    timestamps:true,
    versionKey:false
  }
)

export const Blogs = model<TBlog>('Blog', blogSchema)