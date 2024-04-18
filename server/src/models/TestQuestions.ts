import mongoose from 'mongoose';

export interface ITestQuestion {
  _id: number;
  times_used: number;
  User_Val: number;
  profit_a: number;
  profit_b: number;
  actual_B_bid: number;
  VA1: number;
  PA1: number;
  VB1: number;
  VB2: number;
  VB3: number;
  VB4: number;
  VB5: number;
  VB6: number;
  VB7: number;
  VB8: number;
  PB1: number;
  PB2: number;
  PB3: number;
  PB4: number;
  PB5: number;
  PB6: number;
  PB7: number;
  PB8: number;
  participation_fee: number;
}

const TestQuestionsSchema = new mongoose.Schema<ITestQuestion>({
  _id: Number,
  times_used: { type: Number, min: 0, max: 4 },
  User_Val: Number,
  profit_a: Number,
  profit_b: Number,
  actual_B_bid: Number,
  VA1: Number,
  PA1: Number,
  VB1: Number,
  VB2: Number,
  VB3: Number,
  VB4: Number,
  VB5: Number,
  VB6: Number,
  VB7: Number,
  VB8: Number,
  PB1: Number,
  PB2: Number,
  PB3: Number,
  PB4: Number,
  PB5: Number,
  PB6: Number,
  PB7: Number,
  PB8: Number,
  participation_fee: Number,
});

const TestQuestions = mongoose.model('TestQuestions', TestQuestionsSchema);

export default TestQuestions;
