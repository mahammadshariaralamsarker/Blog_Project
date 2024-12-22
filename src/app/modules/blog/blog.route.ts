import express from 'express'
import { blogController } from './blog.controller' 
import { createBlogValidationSchema, updateBlogValidationSchema } from './blog.validation' 
import { auth } from '../../middleware/auth'
import { validateRequest } from '../../middleware/validateRequest'

const router = express.Router()



// route 
router.post('/', auth.authUser, validateRequest(createBlogValidationSchema), blogController.blogCreate)
router.get('/', auth.authUser, blogController.getBlog)
router.patch('/:Id', auth.authUser, validateRequest(updateBlogValidationSchema), blogController.blogUpdate)
router.delete('/:Id', auth.authUser, blogController.blogDelete)
export const BlogsRoute = router




