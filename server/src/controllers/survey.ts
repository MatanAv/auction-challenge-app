import UserSurveyAnswers, { IUserSurveyAnswers } from '@/models/UserSurveyAnswers';
import { SurveyAnswers } from '@/interfaces/survey';

const createSurveyAnswers = async (workerId: string, answers: SurveyAnswers): Promise<IUserSurveyAnswers> => {
  const userSurvey = await UserSurveyAnswers.create({ worker_id: workerId, answers });
  return userSurvey;
};

export { createSurveyAnswers };
