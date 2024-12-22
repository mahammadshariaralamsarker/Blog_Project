import express from 'express'
import validationRequest from '../../middlewares/validationRequest'
import { blockUserValidationSchema } from '../user/user.validation'
import { auth } from '../../middlewares/auth'
import { blogController } from '../blog/blog.controller'
import { userController } from '../user/auth.controller'

const router = express.Router()

// route 
router.patch('/users/:userId/block', auth.authUser, auth.onlyAdmin, validationRequest(blockUserValidationSchema), userController.userBlockUpdate)
router.delete('/blogs/:Id', auth.authUser, auth.onlyAdmin, blogController.blogDelete)

export const AdminRoute = router



