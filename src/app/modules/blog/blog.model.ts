import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";
const blogSchema = new Schema<TBlog>({
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    isPublished: {
        type: Boolean,
        require: true,
        default: true,

    }
}, { timestamps: true });

export const BlogModel = model<TBlog>('Blog', blogSchema)