import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ResponseFormat } from '@/types/api';
import { getErrorResponse } from '@/utils/api';
import { FailureReasonsTypes } from '@/types/users';
import { IUserInfo, IUserInstructions, IUserTraining, IUserTest } from '@/interfaces/user';
import ServerError from '@/services/errors/ServerError';
import User, { IUser } from '@/models/User';

const createUser = async (worker_id: string, req: Request): Promise<ResponseFormat> => {
  try {
    const user = await User.create({ worker_id });
    req.session.worker_id = user._id.toString();
    return { status: StatusCodes.CREATED, data: user as IUser };
  } catch (error: any) {
    return getErrorResponse(error, StatusCodes.CONFLICT, 'User already exists');
  }
};

const logoutUser = (req: Request): ResponseFormat => {
  try {
    req.session.destroy(() => {});
    return { status: StatusCodes.OK, data: { message: 'User has logged out' } };
  } catch (error: any) {
    return getErrorResponse(error);
  }
};

const updateUser = async (worker_id: string, update: Partial<IUser>): Promise<ResponseFormat> => {
  try {
    const user = await User.findByIdAndUpdate(worker_id, update, { new: true });
    if (!user) throw new ServerError(StatusCodes.NO_CONTENT, 'User not found');
    return { status: StatusCodes.OK, data: user as IUser };
  } catch (error: any) {
    return getErrorResponse(error, error.code, error.message);
  }
};

const updateUserInfo = async (worker_id: string, user_info: IUserInfo): Promise<ResponseFormat> => {
  return updateUser(worker_id, { user_info });
};

const updateUserInstructions = async (
  worker_id: string,
  user_instructions: IUserInstructions
): Promise<ResponseFormat> => {
  return updateUser(worker_id, { user_instructions });
};

const updateUserTraining = async (worker_id: string, user_training: IUserTraining): Promise<ResponseFormat> => {
  return updateUser(worker_id, { user_training });
};

const updateUserTest = async (worker_id: string, user_test: IUserTest): Promise<ResponseFormat> => {
  return updateUser(worker_id, { user_test });
};

const updateUserFail = async (worker_id: string, failure_reason: FailureReasonsTypes): Promise<ResponseFormat> => {
  return updateUser(worker_id, { failure_reason });
};

export {
  createUser,
  logoutUser,
  updateUserInfo,
  updateUserInstructions,
  updateUserTraining,
  updateUserTest,
  updateUserFail
};
