import mongoose from 'mongoose';
import { SurveyAnswers } from '@/interfaces/survey';
import { Q1Answers, Q2Answers, Q3Answers } from '@/enums/survey';

export interface IUserSurveyAnswers {
  worker_id: string;
  answers: SurveyAnswers;
}

const UserSurveyAnswersSchema = new mongoose.Schema<IUserSurveyAnswers>({
  worker_id: { type: String, ref: 'User.worker_id', required: true },
  answers: {
    q1: { type: String, required: true, enum: Object.values(Q1Answers) },
    q2: { type: String, required: true, enum: Object.values(Q2Answers) },
    q3: { type: String, required: true, enum: Object.values(Q3Answers) },
    comment: String
  }
});

const UserSurveyAnswers = mongoose.model('UserSurveyAnswers', UserSurveyAnswersSchema);

export default UserSurveyAnswers;
