import mongoose from 'mongoose';
import { SurveyAnswers } from '@/interfaces/survey';

export interface IUserSurveyAnswers {
  worker_id: string;
  answers: SurveyAnswers;
}

const UserSurveyAnswersSchema = new mongoose.Schema<IUserSurveyAnswers>({
  worker_id: { type: String, ref: 'User', required: true },
  answers: {
    q1: { type: Number, min: 1, max: 4 },
    q2: { type: Number, min: 1, max: 3 },
    q3: { type: Number, min: 1, max: 4 },
    comment: String,
  },
});

const UserSurveyAnswers = mongoose.model('UserSurveyAnswers', UserSurveyAnswersSchema);

export default UserSurveyAnswers;
