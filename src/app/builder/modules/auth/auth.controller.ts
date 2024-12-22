import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import httpStatus from 'http-status'
import AppError from "../../error/AppError";

const userCreaetAccount = catchAsync(async (req, res) => {
    const data = req.body;
    if (!data) throw new AppError(httpStatus.NOT_FOUND, "Validation error")
    const result = await AuthService.createUserIntoDB(data)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User registered successfully",
        data: result
    })

})

const userLogin = catchAsync(async (req, res) => {
    const data = req.body;
    if (!data) throw new AppError(httpStatus.FOUND,"Invalid credentials")
    const result = await AuthService.loginUserIntoDB(data)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Login successful",
        data: { token: result }
    })
})
export const authController = { userCreaetAccount, userLogin }