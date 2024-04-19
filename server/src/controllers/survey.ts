import UserSurveyAnswers, { IUserSurveyAnswers } from '@/models/UserSurveyAnswers';
import { SurveyAnswers } from '@/interfaces/survey';

const submitSurvey = async (worker_id: string, answers: SurveyAnswers): Promise<IUserSurveyAnswers> => {
  const userSurvey = await UserSurveyAnswers.create({ worker_id, answers });
  return userSurvey;
};

export { submitSurvey };
