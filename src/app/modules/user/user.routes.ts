import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post('/create-user',UserController.createUsers)
export const UserRoutes = router