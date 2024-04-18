import mongoose from 'mongoose';
import { UserInfo, UserInstructions, UserTraining, UserTest } from '@/interfaces/user';
import { getCountriesList } from '@/utils/countries';
import { Genders, Educations } from '@/enums/users';

export interface IUser {
  _id: string;
  is_test_eligible?: boolean;
  user_info?: UserInfo;
  user_instructions?: UserInstructions;
  user_training?: UserTraining;
  user_test?: UserTest;
}

mongoose.SchemaTypeOptions;

const UserSchema = new mongoose.Schema<IUser>({
  _id: { type: String, required: true },
  user_info: {
    age: { type: Number, min: 0, max: 120 },
    gender: { type: String, enum: Object.values(Genders) },
    education: { type: String, enum: Object.values(Educations) },
    nationality: { type: String, enum: getCountriesList() }
  },
  user_instructions: {
    score: Number,
    fails: { type: Number, max: 3 },
    duration: Number
  },
  user_training: {
    rounds: Number,
    duration: Number
  },
  user_test: {
    rounds: { type: Number, max: 25 },
    profit: Number,
    bonus: Number,
    duration: Number
  }
});

UserSchema.pre('save', function (next) {
  if (this.user_test?.profit) {
    this.user_test.bonus = this.user_test.profit * 0.1;
  }

  next();
});

const User = mongoose.model('User', UserSchema);

export default User;
