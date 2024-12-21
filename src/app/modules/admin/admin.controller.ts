import { RequestHandler } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AdminService } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";
import httpstatus from 'http-status-codes'
const updateUser: RequestHandler = catchAsync(async (req, res) => {
    const { userId: id } = req.params;
  const { userdata } = req.body;
  const result = await AdminService.updateUser(id, userdata);
  sendResponse(res, {
    success: true,
    statusCode: httpstatus.OK,
    message: 'User blocked successfully',
    data: result,
  });
});