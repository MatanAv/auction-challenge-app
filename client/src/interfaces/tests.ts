import { AnswersValues } from '@/types/users';

export interface ITestQuestion {
  _id: string;
  question_id: number;
  class: number;
  group_id?: number;
  win_a: boolean;
  win_b: boolean;
  LotNumA: number;
  LotNumB: number;
  User_Val: number;
  profit_a: number;
  profit_b: number;
  actual_B_bid: number;
  VA1: number;
  PA1: number;
  VB1: number;
  VB2: number;
  VB3?: number;
  VB4?: number;
  VB5?: number;
  VB6?: number;
  VB7?: number;
  VB8?: number;
  PB1: number;
  PB2: number;
  PB3?: number;
  PB4?: number;
  PB5?: number;
  PB6?: number;
  PB7?: number;
  PB8?: number;
  participation_fee?: number;
  times_used: number;
}

export interface IUserTestAnswer {
  worker: string;
  question: string;
  is_training: boolean;
  round: number;
  answer: AnswersValues;
  profit: number;
  duration: number;
}
