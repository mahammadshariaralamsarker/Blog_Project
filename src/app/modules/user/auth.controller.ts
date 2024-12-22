import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
import AppError from "../../error/AppError";
;


const userUpdate = catchAsync(async (req, res) => {
    const data = req.body;
    const { Id } = req.params;
    if (!data || !Id) throw new AppError(httpStatus.NOT_FOUND, "Invalid Body Information")
    const result = await UserService.updateUserIntoDB(data, Id)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Blog created successfully",
        data: result
    })

})
const userBlockUpdate = catchAsync(async (req, res) => {
    const { userId } = req.params;
    if (!userId) throw new AppError(httpStatus.NOT_FOUND, "Invalid Body Information")
    const result = await UserService.blockUserIntoDB(userId)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User blocked successfully",
        data: result
    })

})

export const userController = { userUpdate,userBlockUpdate }