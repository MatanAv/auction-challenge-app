import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

export interface IUserTestAnswer {
  worker: string;
  question: string;
  is_training: boolean;
  round: number;
  answer: 'a' | 'b';
  profit: number;
  duration: number;
}

const UserTestAnswersSchema = new mongoose.Schema({
  worker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, autopopulate: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'TestQuestions', required: true, autopopulate: true },
  is_training: { type: Boolean, required: true },
  round: { type: Number, required: true },
  answer: { type: String, enum: ['a', 'b'], required: true },
  profit: { type: Number, required: true },
  duration: { type: Number, required: true }
});

UserTestAnswersSchema.plugin(mongooseAutoPopulate);

const UserTestAnswers = mongoose.model('UserTestAnswers', UserTestAnswersSchema);

export default UserTestAnswers;
