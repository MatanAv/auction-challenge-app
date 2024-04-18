import mongoose from 'mongoose';
import { UserInfo } from '@/interfaces/user';
import { getCountriesList } from '@/utils/countries';
import { genderEnums, educationEnums } from '@/enums';

export interface IUser {
  _id: string;
  is_test_eligible?: boolean;
  user_info?: UserInfo;
  user_test_summary?: {
    test_duration: string;
    total_profit: number;
  };
}

const UserSchema = new mongoose.Schema<IUser>({
  _id: { type: String, required: true },
  is_test_eligible: { type: Boolean, default: true },
  user_info: {
    age: { type: Number, min: 0, max: 120 },
    gender: { type: String, enum: genderEnums },
    education: { type: String, enum: educationEnums },
    nationality: { type: String, enum: getCountriesList() },
  },
  user_test_summary: {
    test_duration: { type: String },
    total_profit: { type: Number },
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
