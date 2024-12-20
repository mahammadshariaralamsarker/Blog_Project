import { Router } from "express";
import { BlogController } from "./blogs.controller";

const router = Router();
router.post('/',BlogController.createBlog)
router.delete('/:id',BlogController.deleteBlog)
export const BlogRoutes = router