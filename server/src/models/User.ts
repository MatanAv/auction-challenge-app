import mongoose from 'mongoose';
import { IUserInfo, IUserInstructions, IUserTraining, IUserTest } from '@/interfaces/user';
import { Genders, Educations } from '@/enums/users';

export interface IUser {
  worker_id: string;
  user_info?: IUserInfo;
  user_instructions?: IUserInstructions;
  user_training?: IUserTraining;
  user_test?: IUserTest;
}

const UserSchema = new mongoose.Schema<IUser>({
  worker_id: { type: String, unique: true, required: true },
  user_info: {
    age: { type: Number, min: 0, max: 120 },
    gender: { type: String, enum: Object.values(Genders) },
    education: { type: String, enum: Object.values(Educations) },
    nationality: String
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
    profit: { type: Number, min: 0 },
    bonus: { type: Number, min: 0 },
    duration: Number
  }
});

const User = mongoose.model('User', UserSchema);

export default User;
