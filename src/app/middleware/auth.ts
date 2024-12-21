import { NextFunction, Request, Response } from 'express'; 
import httpstatus from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken'; 
import { catchAsync } from '../utils/catchAsync';
import AppError from '../../error/app.error';
import config from '../../config';

interface CustomRequest extends Request {
  user: JwtPayload;
}

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(httpstatus.UNAUTHORIZED, 'You are not authorized!');
      }
      // check if the token is valid and verify the token
      jwt.verify(
        token,
        config.jwt_access_secret as string,
        function (err, decoded) {
          if (err) {
            throw new AppError(
              httpstatus.UNAUTHORIZED,
              'You are not Authorised!',
            );
          }
          const role = (decoded as JwtPayload).role
          if(requiredRoles && !requiredRoles.includes(role) ){
            throw new AppError(
              httpstatus.UNAUTHORIZED,
              'You are not Authorised!',
            );
          }
          req.user = decoded as JwtPayload;
          next();
        },
      );

    },
  );
};
