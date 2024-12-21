import { model, Schema } from "mongoose"; 
import { TRegister } from "./register.interface";

const registerSchema = new Schema <TRegister>(
  {
    name:{
      type:String,
      required:true
    },
    password:{
      type:String,
      required:true  
    },
    email:{
      type:String,
      required:true  
    },
     
  },
  {
    versionKey:false
  }
   
)
 
export const Register = model<TRegister>('Register', registerSchema)