import { Router } from "express";  
import { RegisterController } from "./register.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { zodValidation } from "./register.validation";

const router = Router();
router.post('/register',validateRequest(zodValidation.createRegisterSchema),RegisterController.createBlogRegister)

export const RegisterRoutes = router