import { TRegister } from './register.interface';
import { Register } from './register.model';
const createRegisterIntoDB = async (payload: TRegister) => {
  const result = await Register.create(payload);
  return result;
}; 
 
export const RegisterService = {
  createRegisterIntoDB
};
