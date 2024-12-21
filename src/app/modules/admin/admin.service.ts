import { TUser } from "../user/user.interface"
import { User } from "../user/user.model"

const updateUser = async(id:string, payload:Partial<TUser>) =>{
  
  const result = await User.findByIdAndUpdate({id}, payload,{new:true})
  return result 
}
export const AdminService = {
  updateUser
}