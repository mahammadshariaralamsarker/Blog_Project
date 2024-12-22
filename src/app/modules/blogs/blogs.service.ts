import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../../builder/QueryBuilder';
import AppError from '../../../error/app.error';
import { TBlog } from './blogs.interface';
import { Blog } from './blogs.model';
import httpStatus from 'http-status-codes'
const createBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};
const deleteBlog = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};
const updateBlog = async (id: string, payload: TBlog) => {
  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const blogsearhableFields = [
  'title','content'
]
const getAllBlog = async (query: Record<string, unknown>) => {

  const blogQuery = new QueryBuilder(
    Blog.find().select('-createdAt -updatedAt')
    .populate('author'),
    query,
  )
    .search(blogsearhableFields)
    .filter()
    .sort() 
    .fields();
  const result = await blogQuery.modelQuery;
  return result;
};

const deleteBlogIntoDB = async (Id: string, user: JwtPayload) => {
  let filter = {}
  const { _id, role } = user._doc;
  if (role === 'admin') {
      filter = { _id: Id }
  } else {
      filter = { _id: Id, author:_id }
  }


  const result = await Blog.deleteOne(filter);
  if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid Delete Infomation")
  return result;
}
export const BlogService = {
  createBlogIntoDB,
  deleteBlog,
  updateBlog,
  getAllBlog,deleteBlogIntoDB
};
