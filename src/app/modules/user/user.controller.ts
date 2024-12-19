import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserService } from "./user.service";
import httpstatus from 'http-status-codes'

const createUsers = catchAsync(async(req,res)=>{
  const result = await UserService.createUserIntoDB(req.body)
   
    sendResponse(res, {
      statusCode: httpstatus.OK,
      success: true,
      message: 'User Created successfully',
      data: result,
    });
})

export const UserController = {
  createUsers
}