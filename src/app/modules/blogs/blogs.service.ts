import QueryBuilder from '../../../builder/QueryBuilder';
import { TBlog } from './blogs.interface';
import { Blog } from './blogs.model';

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

export const BlogService = {
  createBlogIntoDB,
  deleteBlog,
  updateBlog,
  getAllBlog,
};
