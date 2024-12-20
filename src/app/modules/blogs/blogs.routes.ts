import { Router } from "express";
import { BlogController } from "./blogs.controller";

const router = Router();
router.post('/',BlogController.createBlog)
router.delete('/:id',BlogController.deleteBlog)
router.patch('/:id',BlogController.updateBlog)
export const BlogRoutes = router