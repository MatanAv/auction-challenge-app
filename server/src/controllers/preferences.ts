import { StatusCodes } from 'http-status-codes';
import { ResponseFormat } from '@/types/api';
import { getErrorResponse } from '@/utils/api';
import UserPreferencesAnswers, { UserPreferencesAnswer } from '@/models/UserPreferencesAnswers';

const submitPreferences = async (worker_id: string, answers: UserPreferencesAnswer): Promise<ResponseFormat> => {
    try {
        await UserPreferencesAnswers.create({ worker: worker_id, answers });
        return { status: StatusCodes.CREATED };
    } catch (error: any) {
        return getErrorResponse(error);
    }
};

export { submitPreferences };
