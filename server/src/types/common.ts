import { genderEnums, educationEnums } from '@/enums';

type GenderTypes = keyof typeof genderEnums;

type EducationTypes = keyof typeof educationEnums;

export type { GenderTypes, EducationTypes };
