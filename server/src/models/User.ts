import mongoose from 'mongoose';
import { UserInfo, UserInstructions, UserTraining, UserTest } from '@/interfaces/user';
import { Genders, Educations } from '@/enums/users';

export interface IUser {
  worker_id: string;
  user_info?: UserInfo;
  user_instructions?: UserInstructions;
  user_training?: UserTraining;
  user_test?: UserTest;
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
