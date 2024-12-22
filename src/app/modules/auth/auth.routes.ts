import express from 'express' 
import { createUserValidationSchema } from '../user/user.validation'  
import { validateRequest } from '../../middleware/validateRequest'
import { LoginAuthValidationSchema } from './auth.validation'
import { authController } from './auth.controller'

const router = express.Router()



// route 
router.post('/register', validateRequest(createUserValidationSchema), authController.userCreaetAccount)
router.post('/login', validateRequest(LoginAuthValidationSchema), authController.userLogin)

export const AuthRoute = router




