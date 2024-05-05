import config from '@/config';
import { StatusCodes } from 'http-status-codes';
import { ResponseFormat } from '@/types/api';
import { getErrorResponse } from '@/utils/api';
import { ISurveyAnswers } from '@/interfaces/survey';
import UserSurveyAnswers from '@/models/UserSurveyAnswers';

const submitSurvey = async (worker_id: string, answers: ISurveyAnswers): Promise<ResponseFormat> => {
  try {
    await UserSurveyAnswers.create({ worker: worker_id, answers });
    return { status: StatusCodes.CREATED, approval_key: config.game.approvalKey };
  } catch (error: any) {
    return getErrorResponse(error);
  }
};

export { submitSurvey };
