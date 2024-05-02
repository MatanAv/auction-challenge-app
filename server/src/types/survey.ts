import { Q1Answers, Q2Answers, Q3Answers } from '@/enums/survey';

type Q1AnswersTypes = keyof typeof Q1Answers;

type Q2AnswersTypes = keyof typeof Q2Answers;

type Q3AnswersTypes = keyof typeof Q3Answers;

export type { Q1AnswersTypes, Q2AnswersTypes, Q3AnswersTypes };
