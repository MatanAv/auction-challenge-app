import type { GenderTypes, EducationTypes } from '@/types/users';

export interface IUserInfo {
  age: number;
  gender: GenderTypes;
  education: EducationTypes;
  nationality: string;
}

export interface IUserInstructions {
  score: number;
  fails: number;
  duration: number;
}

export interface IUserTraining {
  rounds: number;
  duration: number;
}

export interface IUserTest {
  rounds: number;
  profit: number;
  bonus?: number;
  duration: number;
}
