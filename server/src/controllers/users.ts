import { StatusCodes } from 'http-status-codes';
import { ResponseFormat } from '@/types/api';
import { UserInfo, UserInstructions, UserTraining, UserTest } from '@/interfaces/user';
import User, { IUser } from '@/models/User';

const createUser = async (worker_id: string): Promise<ResponseFormat> => {
  try {
    const user = await User.create({ worker_id });
    return { status: StatusCodes.CREATED, data: user as IUser };
  } catch (error: any) {
    return { status: StatusCodes.UNAUTHORIZED, message: error.message };
  }
};

const updateUser = async (worker_id: string, update: Partial<IUser>): Promise<ResponseFormat> => {
  try {
    const user = await User.findOneAndUpdate({ worker_id }, update, { new: true });
    if (!user) throw new Error('User not found');
    return { status: StatusCodes.OK, data: user as IUser };
  } catch (error: any) {
    return { status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message };
  }
};

const updateUserInfo = async (worker_id: string, user_info: UserInfo): Promise<ResponseFormat> => {
  return updateUser(worker_id, { user_info });
};

const updateUserInstructions = async (
  worker_id: string,
  user_instructions: UserInstructions
): Promise<ResponseFormat> => {
  return updateUser(worker_id, { user_instructions });
};

const updateUserTraining = async (worker_id: string, user_training: UserTraining): Promise<ResponseFormat> => {
  return updateUser(worker_id, { user_training });
};

const updateUserTest = async (worker_id: string, user_test: UserTest): Promise<ResponseFormat> => {
  return updateUser(worker_id, { user_test });
};

export { createUser, updateUserInfo, updateUserInstructions, updateUserTraining, updateUserTest };
