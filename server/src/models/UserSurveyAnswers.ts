import mongoose from 'mongoose';

export interface IUserSurveyAnswers {
  worker_id: string;
  q1: number;
  q2: number;
  q3: number;
  comment: string;
}

const UserSurveyAnswersSchema = new mongoose.Schema({
  worker_id: String,
  q1: { type: Number, min: 1, max: 4 },
  q2: { type: Number, min: 1, max: 3 },
  q3: { type: Number, min: 1, max: 4 },
  comment: String
});

const UserSurveyAnswers = mongoose.model('UserSurveyAnswers', UserSurveyAnswersSchema);

export default UserSurveyAnswers;
