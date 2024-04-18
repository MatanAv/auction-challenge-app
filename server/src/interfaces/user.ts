import type { GenderTypes, EducationTypes } from '@/types/common';

export interface UserInfo {
  age: number;
  gender: GenderTypes;
  education: EducationTypes;
  nationality: string;
}
