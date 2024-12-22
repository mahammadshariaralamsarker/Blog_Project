import express from 'express'
import { blogController } from './blog.controller'
import validationRequest from '../../middlewares/validationRequest'
import { createBlogValidationSchema, updateBlogValidationSchema } from './blog.validation'
import { auth } from '../../middlewares/auth'

const router = express.Router()



// route 
router.post('/', auth.authUser, validationRequest(createBlogValidationSchema), blogController.blogCreate)
router.get('/', auth.authUser, blogController.getBlog)
router.patch('/:Id', auth.authUser, validationRequest(updateBlogValidationSchema), blogController.blogUpdate)
router.delete('/:Id', auth.authUser, blogController.blogDelete)
export const BlogsRoute = router




