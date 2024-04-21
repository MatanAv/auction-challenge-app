import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { SurveyAnswers } from '@/interfaces/survey';
import { Q1Answers, Q2Answers, Q3Answers } from '@/enums/survey';

export interface IUserSurveyAnswers {
  worker_id: string;
  answers: SurveyAnswers;
}

const UserSurveyAnswersSchema = new mongoose.Schema({
  worker: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true, autopopulate: true },
  answers: {
    q1: { type: String, required: true, enum: Object.values(Q1Answers) },
    q2: { type: String, required: true, enum: Object.values(Q2Answers) },
    q3: { type: String, required: true, enum: Object.values(Q3Answers) },
    comment: String
  }
});

UserSurveyAnswersSchema.plugin(mongooseAutoPopulate);

const UserSurveyAnswers = mongoose.model('UserSurveyAnswers', UserSurveyAnswersSchema);

export default UserSurveyAnswers;
