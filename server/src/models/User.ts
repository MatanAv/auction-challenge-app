import mongoose from 'mongoose';
import { getCountriesList } from '@/utils/countries';
import { genderEnums, educationEnums } from '@/utils/common-enums';
import type { GenderTypes, EducationTypes } from '@/types/common';

const nations = getCountriesList();

export interface IUser {
  _id: string;
  age?: number;
  gender?: GenderTypes;
  education?: EducationTypes;
  nationality?: string;
  is_eligible?: boolean;
}

const UserSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  age: { type: Number },
  gender: { type: String, enum: genderEnums },
  education: { type: String, enum: educationEnums },
  nationality: { type: String, enum: nations },
  is_eligible: { type: Boolean, default: true }
});

const User = mongoose.model('User', UserSchema);

export default User;
