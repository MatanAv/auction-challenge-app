import mongoose from 'mongoose';

export interface IUserTestAnswers {
  worker_id: string;
  question_id: string;
  answer: 'A' | 'B';
}

const UserTestAnswersSchema = new mongoose.Schema({
  worker_id: String,
  question_id: String,
  answer: { type: String, enum: ['A', 'B'] }
});

const UserTestAnswers = mongoose.model('UserTestAnswers', UserTestAnswersSchema);

export default UserTestAnswers;
