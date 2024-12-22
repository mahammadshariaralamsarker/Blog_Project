import { Router } from "express"; 
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { blockUserValidationSchema } from "../user/user.validation"; 
import { BlogController } from "../blogs/blogs.controller";
import { UserController } from "../user/user.controller";
import { authController } from "../auth/auth.controller";

const router = Router();
// route 
router.patch('/users/:userId/block', auth.authUser, auth.onlyAdmin, validateRequest(blockUserValidationSchema), authController.userBlockUpdate)
router.delete('/blogs/:Id', auth.authUser, auth.onlyAdmin, BlogController.blogDelete)

export const AdminRoutes = router