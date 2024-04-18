import mongoose from 'mongoose';

export interface IUserTestAnswer {
  worker_id: string;
  question_id: number;
  answer: 'A' | 'B';
  duration: string;
}

const UserTestAnswersSchema = new mongoose.Schema<IUserTestAnswer>({
  worker_id: { type: String, ref: 'User', required: true },
  question_id: { type: Number, ref: 'TestQuestions', required: true },
  answer: { type: String, enum: ['A', 'B'], required: true },
  duration: { type: String, required: true },
});

const UserTestAnswers = mongoose.model('UserTestAnswers', UserTestAnswersSchema);

export default UserTestAnswers;
