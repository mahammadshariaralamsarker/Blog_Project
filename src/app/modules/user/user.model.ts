import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    name:{
      type:String,
      required:true
    },
    password:{
      type:String,
      required:true
    },
    role:{
      type:String,
      enum:['user','blog']
    },
    isBlocked:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps:true,
    versionKey:false
  }
)

export const User = model<TUser>('User',userSchema)