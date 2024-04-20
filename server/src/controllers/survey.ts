import { StatusCodes } from 'http-status-codes';
import { ResponseFormat } from '@/types/api';
import { SurveyAnswers } from '@/interfaces/survey';
import UserSurveyAnswers from '@/models/UserSurveyAnswers';

const submitSurvey = async (worker_id: string, answers: SurveyAnswers): Promise<ResponseFormat> => {
  try {
    await UserSurveyAnswers.create({ worker_id, answers });
    return { status: StatusCodes.CREATED };
  } catch (error: any) {
    return { status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message };
  }
};

export { submitSurvey };
