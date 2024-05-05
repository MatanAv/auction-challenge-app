import { Q1AnswersTypes, Q2AnswersTypes, Q3AnswersTypes } from '@/types/survey';

export interface ISurveyAnswers {
  q1: Q1AnswersTypes;
  q2: Q2AnswersTypes;
  q3: Q3AnswersTypes;
  comment?: string;
}

export interface IUserSurveyAnswers {
  worker_id: string;
  answers: ISurveyAnswers;
}
