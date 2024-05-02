import type { GenderTypes, EducationTypes } from '@/types/users';

export interface UserInfo {
  age: number;
  gender: GenderTypes;
  education: EducationTypes;
  nationality: string;
}

export interface UserInstructions {
  score: number;
  fails: number;
  duration: number;
}

export interface UserTraining {
  rounds: number;
  duration: number;
}

export interface UserTest {
  rounds: number;
  profit: number;
  bonus?: number;
  duration: number;
}
