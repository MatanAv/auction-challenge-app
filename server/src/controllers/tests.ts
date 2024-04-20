import { StatusCodes } from 'http-status-codes';
import { ResponseFormat } from '@/types/api';
import { MAX_TIMES_USED } from '@/constants';
import { updateUserTest } from './users';
import { IUser } from '@/models/User';
import TestQuestions from '@/models/TestQuestions';
import UserTestAnswers, { IUserTestAnswer } from '@/models/UserTestAnswers';

const getRandomQuestions = async (size: number): Promise<ResponseFormat> => {
  try {
    const testQuestions = await TestQuestions.aggregate([
      { $sample: { size }, $match: { times_used: { $lt: MAX_TIMES_USED } } }
    ]);
    return { status: StatusCodes.OK, data: testQuestions };
  } catch (error: any) {
    return { status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message };
  }
};

const submitQuestions = async (answers: IUserTestAnswer[]): Promise<ResponseFormat> => {
  try {
    const userAnswers = await UserTestAnswers.insertMany(answers);
    return { status: StatusCodes.OK, data: userAnswers };
  } catch (error: any) {
    return { status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message };
  }
};

const updateQuestionsTimesUsed = async (questionsIds: number[]): Promise<void | ResponseFormat> => {
  try {
    await TestQuestions.updateMany({ question_id: { $in: questionsIds } }, { $inc: { times_used: 1 } });
    return { status: StatusCodes.OK };
  } catch (error: any) {
    return { status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message };
  }
};

const getTestSummary = async (
  worker_id: string,
  answers: IUserTestAnswer[],
  duration: number
): Promise<ResponseFormat> => {
  try {
    const rounds = answers.length;
    const profit = answers.reduce((acc, answer) => acc + answer.profit, 0);
    const user = (await updateUserTest(worker_id, { rounds, profit, duration })).data as IUser;
    return { status: StatusCodes.OK, data: user.user_test };
  } catch (error: any) {
    return { status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message };
  }
};

export { getRandomQuestions, submitQuestions, updateQuestionsTimesUsed, getTestSummary };
