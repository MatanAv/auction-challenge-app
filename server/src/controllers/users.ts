import User, { IUser } from '@/models/User';
import { UserInfo } from '@/interfaces/user';

const createUser = async (workerId: string): Promise<IUser> => {
  const user = await User.create({ _id: workerId });
  return user;
};

const updateUserInfo = async (workerId: string, userInfo: UserInfo): Promise<IUser | null> => {
  const user = await User.findByIdAndUpdate(workerId, { user_info: userInfo });
  return user;
};

const updateEligibility = async (workerId: string, isEligible: boolean): Promise<IUser | null> => {
  const user = await User.findByIdAndUpdate(workerId, { is_test_eligible: isEligible });
  return user;
};

export { createUser, updateUserInfo, updateEligibility };
