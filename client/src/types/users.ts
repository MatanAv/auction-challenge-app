import { Genders, Educations } from '@/enums/users';

type GenderTypes = keyof typeof Genders;

type EducationTypes = keyof typeof Educations;

export type { GenderTypes, EducationTypes };
