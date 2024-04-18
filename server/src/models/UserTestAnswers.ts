import mongoose from 'mongoose';

export interface IUserTestAnswer {
  worker_id: string;
  question_id: number;
  round: number;
  answer: 'a' | 'b';
  profit: number;
  duration: number;
}

const UserTestAnswersSchema = new mongoose.Schema<IUserTestAnswer>({
  worker_id: { type: String, ref: 'User', required: true },
  question_id: { type: Number, ref: 'TestQuestions', required: true },
  round: { type: Number, required: true },
  answer: { type: String, enum: ['a', 'b'], required: true },
  profit: { type: Number, required: true },
  duration: { type: Number, required: true }
});

const UserTestAnswers = mongoose.model('UserTestAnswers', UserTestAnswersSchema);

export default UserTestAnswers;
