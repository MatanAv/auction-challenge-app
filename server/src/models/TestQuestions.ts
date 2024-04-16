import mongoose from 'mongoose';

export interface ITestQuestions {
  _id: number;
  times_used: number;
  profit_a: number;
  profit_b: number;
  LotNumA: number;
  LotNumB: number;
  User_Val: number;
  actual_B_bid: number;
  VA1: number;
  VB1: number;
  VB2: number;
  PB1: number;
  PB2: number;
  participation_fee: number;
}

const TestQuestionsSchema = new mongoose.Schema({
  _id: Number,
  times_used: { type: Number, max: 4 },
  profit_a: Number,
  profit_b: Number,
  LotNumA: Number,
  LotNumB: Number,
  User_Val: Number,
  actual_B_bid: Number,
  VA1: Number,
  VB1: Number,
  VB2: Number,
  PB1: Number,
  PB2: Number,
  participation_fee: Number
});

const TestQuestions = mongoose.model('TestQuestions', TestQuestionsSchema);

export default TestQuestions;
