import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { TUser } from './user.interface';
import config from '../../../config';

const userSchema = new mongoose.Schema<TUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey:false
    }
);

// Middleware: Hash password before saving
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// Method: Compare password for authentication
userSchema.methods.comparePassword = async function (enteredPassword ) {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.statics.isPasswordMatched = async function(plaintextPassword, hashedPassword){
    return await  bcrypt.compare(plaintextPassword, hashedPassword)
    }
export const User = mongoose.model<TUser>('User', userSchema);
