import AppError from "../../../../error/app.error";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { AuthService } from "./auth.service";
import httpStatus from "http-status-codes"
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
    if (!data) throw new AppError(httpStatus.NOT_FOUND,"Invalid credentials")
    const result = await AuthService.loginUserIntoDB(data)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Login successful",
        data: { token: result }
    })
})
export const authController = { userCreaetAccount, userLogin }