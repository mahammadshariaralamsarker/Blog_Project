import AppError from "../../../error/app.error";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from 'http-status-codes'
const createUserIntoDB = async(payload:TUser) =>{
  const result = await User.create(payload)
  return result
}

const updateUserIntoDB = async (payload: Partial<TUser>, Id: string) => {
  const result = await User.findOneAndUpdate({ _id: Id }, payload, { new: true });
  if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid User Infomation")
  return result;
}
const blockUserIntoDB = async (Id: string) => {
  const result = await User.findOneAndUpdate({ _id: Id }, { isBlocked: true }, { new: true });
  if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid User Infomation")
  return result;
}
export const UserService = {
  createUserIntoDB,updateUserIntoDB,blockUserIntoDB

}