

import config from '../../../config';
import AppError from '../../../error/app.error';
import { TRegister } from '../Register/register.interface';
import httpstatus from 'http-status-codes';
import  jwt  from 'jsonwebtoken';
import { User } from '../user/user.model';




const loginUser = async (payload:TRegister) => {
   
  const user = await User.findOne({email:payload.email})
   if (!user) {
    throw new AppError(httpstatus.NOT_FOUND, 'This User is not Found!');
  }
  if (!(await User.isPasswordMatched(payload?.password, user.password))) 
    throw new AppError( httpstatus.FORBIDDEN, 'Password donnot matched Blocked!', );
  const jwtPayload = {
    email:user.email,
    userPassword:user.password ,
    role:user.role
  }
  
  const token = jwt.sign(jwtPayload,config.jwt_access_secret as string,{
    expiresIn:"10d"
  })

  return {
  token
  }; 
};
export const AuthService = {
  loginUser,
};
