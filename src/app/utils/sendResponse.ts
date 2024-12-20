import { Response } from 'express';
type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};
export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode:data.statusCode,
    message: data.message,
    data: data.data,
  });
};
