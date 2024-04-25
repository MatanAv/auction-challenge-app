import { Genders, Educations } from '@/enums/users';

type GenderTypes = keyof typeof Genders;

type EducationTypes = keyof typeof Educations;

type AnswersValues = 'a' | 'b';

export type { GenderTypes, EducationTypes, AnswersValues };
