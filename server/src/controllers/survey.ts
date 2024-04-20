import { StatusCodes } from 'http-status-codes';
import { ResponseFormat } from '@/types/api';
import { getResponse } from '@/utils/api';
import { SurveyAnswers } from '@/interfaces/survey';
import UserSurveyAnswers, { IUserSurveyAnswers } from '@/models/UserSurveyAnswers';

type SurveyResponseData = IUserSurveyAnswers | IUserSurveyAnswers[] | null;

const submitSurvey = async (worker_id: string, answers: SurveyAnswers): Promise<ResponseFormat<SurveyResponseData>> => {
  try {
    await UserSurveyAnswers.create({ worker_id, answers });
    return getResponse(StatusCodes.CREATED);
  } catch (error: any) {
    return getResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

export { submitSurvey };
