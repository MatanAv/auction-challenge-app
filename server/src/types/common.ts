import { genderEnums, educationEnums } from '@/utils/common-enums';

type GenderTypes = keyof typeof genderEnums;

type EducationTypes = keyof typeof educationEnums;

export type { GenderTypes, EducationTypes };
