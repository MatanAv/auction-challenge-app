import config from '@/config';
import { StatusCodes } from 'http-status-codes';
import { ResponseFormat } from '@/types/api';
import { MAX_TIMES_USED } from '@/constants';
import { getErrorResponse } from '@/utils/api';
import { updateUserTest, updateUserTraining } from './users';
import { IUser } from '@/models/User';
import TestQuestions from '@/models/TestQuestions';
import UserTestAnswers, { IUserTestAnswer } from '@/models/UserTestAnswers';

const getRandomQuestions = async (size: number): Promise<ResponseFormat> => {
  try {
    const testQuestions = await TestQuestions.aggregate([
      { $sample: { size } },
      { $match: { times_used: { $lt: MAX_TIMES_USED } } }
    ]);
    return { status: StatusCodes.OK, data: testQuestions };
  } catch (error: any) {
    return getErrorResponse(error);
  }
};

const submitQuestions = async (answers: IUserTestAnswer[]): Promise<IUserTestAnswer[]> => {
  const userAnswers = await UserTestAnswers.insertMany(answers);
  return userAnswers;
};

const updateQuestionsTimesUsed = async (answers: IUserTestAnswer[]): Promise<void> => {
  const questionsIds = answers.map((answer) => answer.question);
  await TestQuestions.updateMany({ question: { $in: questionsIds } }, { $inc: { times_used: 1 } });
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
    return { status: StatusCodes.OK, data: user.user_test, approval_key: config.test.approvalKey };
  } catch (error: any) {
    return getErrorResponse(error);
  }
};

const submitTraining = async (
  worker_id: string,
  answers: IUserTestAnswer[],
  duration: number
): Promise<ResponseFormat> => {
  try {
    await submitQuestions(answers);
    return await updateUserTraining(worker_id, { rounds: answers.length, duration });
  } catch (error: any) {
    return getErrorResponse(error);
  }
};

const submitTest = async (worker_id: string, answers: IUserTestAnswer[], duration: number): Promise<ResponseFormat> => {
  try {
    await submitQuestions(answers);
    await updateQuestionsTimesUsed(answers);
    return await getTestSummary(worker_id, answers, duration);
  } catch (error: any) {
    return getErrorResponse(error);
  }
};

export { getRandomQuestions, submitTraining, submitTest };
