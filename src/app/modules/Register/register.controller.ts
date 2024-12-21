import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { RegisterService } from "./register.service"
import httpstatus from 'http-status-codes'

const createBlogRegister = catchAsync(async(req,res)=>{
  const result = await RegisterService.createRegisterIntoDB(req.body)
  sendResponse(res,{
    statusCode: httpstatus.OK,
    success:true,
    message:"User registered successfully",
    data:result
  })
})
export const RegisterController = {
  createBlogRegister
}