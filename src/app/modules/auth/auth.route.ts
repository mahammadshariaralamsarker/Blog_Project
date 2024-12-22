import express from 'express'
import validationRequest from '../../middlewares/validationRequest'
import { createUserValidationSchema } from '../user/user.validation'
import { LoginAuthValidationSchema } from './auth.validation'
import { authController } from './auth.controller'

const router = express.Router()



// route 
router.post('/register', validationRequest(createUserValidationSchema), authController.userCreaetAccount)
router.post('/login', validationRequest(LoginAuthValidationSchema), authController.userLogin)

export const AuthRoute = router




