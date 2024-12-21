import { Router } from "express";
import { BlogController } from "./blogs.controller";
import { zodValidation } from "./blogs.validation";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router();
router.post('/',validateRequest(zodValidation.createZodvalidationSchema),BlogController.createBlog)
router.get('/',BlogController.getAllBlog)
router.delete('/:id',BlogController.deleteBlog)
router.patch('/:id',BlogController.updateBlog)

export const BlogRoutes = router