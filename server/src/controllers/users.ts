import User, { IUser } from '@/models/User';
import { UserInfo, UserInstructions, UserTraining, UserTest } from '@/interfaces/user';

const createUser = async (worker_id: string): Promise<IUser> => {
  const user = await User.create({ worker_id });
  return user;
};

const updateUserInfo = async (worker_id: string, user_info: UserInfo): Promise<IUser | null> => {
  const user = await User.findByIdAndUpdate(worker_id, { user_info });
  return user;
};

const updateUserInstructions = async (
  worker_id: string,
  user_instructions: UserInstructions
): Promise<IUser | null> => {
  const user = await User.findByIdAndUpdate(worker_id, { user_instructions });
  return user;
};

const updateUserTraining = async (worker_id: string, user_training: UserTraining): Promise<IUser | null> => {
  const user = await User.findByIdAndUpdate(worker_id, { user_training });
  return user;
};

const updateUserTest = async (worker_id: string, user_test: UserTest): Promise<IUser | null> => {
  const user = await User.findByIdAndUpdate(worker_id, { user_test });
  return user;
};

export { createUser, updateUserInfo, updateUserInstructions, updateUserTraining, updateUserTest };
