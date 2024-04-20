import { StatusCodes } from 'http-status-codes';
import { getResponse } from '@/utils/api';
import { ResponseFormat } from '@/types/api';
import { UserInfo, UserInstructions, UserTraining, UserTest } from '@/interfaces/user';
import User, { IUser } from '@/models/User';

type UserResponseData = IUser | IUser[] | null;

const createUser = async (worker_id: string): Promise<ResponseFormat<UserResponseData>> => {
  try {
    const user = await User.create({ worker_id });
    return getResponse(StatusCodes.CREATED, undefined, user);
  } catch (error: any) {
    return getResponse(StatusCodes.UNAUTHORIZED, error.message);
  }
};

const updateUserInfo = async (worker_id: string, user_info: UserInfo): Promise<ResponseFormat<UserResponseData>> => {
  try {
    const user = await User.findByIdAndUpdate(worker_id, { user_info });
    return getResponse(StatusCodes.OK, undefined, user);
  } catch (error: any) {
    return getResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateUserInstructions = async (
  worker_id: string,
  user_instructions: UserInstructions
): Promise<ResponseFormat<UserResponseData>> => {
  try {
    const user = await User.findByIdAndUpdate(worker_id, { user_instructions });
    return getResponse(StatusCodes.OK, undefined, user);
  } catch (error: any) {
    return getResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateUserTraining = async (
  worker_id: string,
  user_training: UserTraining
): Promise<ResponseFormat<UserResponseData>> => {
  try {
    const user = await User.findByIdAndUpdate(worker_id, { user_training });
    return getResponse(StatusCodes.OK, undefined, user);
  } catch (error: any) {
    return getResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateUserTest = async (worker_id: string, user_test: UserTest): Promise<ResponseFormat<UserResponseData>> => {
  try {
    const user = await User.findByIdAndUpdate(worker_id, { user_test });
    return getResponse(StatusCodes.OK, undefined, user);
  } catch (error: any) {
    return getResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

export { createUser, updateUserInfo, updateUserInstructions, updateUserTraining, updateUserTest };
