import { Genders, Educations, FailureReasons } from '@/enums/users';

type GenderTypes = keyof typeof Genders;

type EducationTypes = keyof typeof Educations;

type FailureReasonsTypes = keyof typeof FailureReasons;

type AnswersValues = 'a' | 'b';

export type { GenderTypes, EducationTypes, FailureReasonsTypes, AnswersValues };
