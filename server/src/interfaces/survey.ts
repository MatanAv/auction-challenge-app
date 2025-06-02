import { Q1AnswersTypes, Q2AnswersTypes } from '@/types/survey';

export interface ISurveyAnswers {
    q1: Q1AnswersTypes;
    q2: Q2AnswersTypes;
    comment?: string;
}
