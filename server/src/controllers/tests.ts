import { StatusCodes } from 'http-status-codes';
import { getResponse } from '@/utils/api';
import { ResponseFormat } from '@/types/api';
import { MAX_TIMES_USED } from '@/constants';
import { UserTest } from '@/interfaces/user';
import { updateUserTest } from './users';
import TestQuestions, { ITestQuestion } from '@/models/TestQuestions';
import UserTestAnswers, { IUserTestAnswer } from '@/models/UserTestAnswers';

type TestQuestionsResponseData = ITestQuestion | ITestQuestion[] | null;
type TestAnswersResponseData = IUserTestAnswer | IUserTestAnswer[] | null;

const getRandomQuestions = async (size: number): Promise<ResponseFormat<TestQuestionsResponseData>> => {
  try {
    const testQuestions = await TestQuestions.aggregate([
      { $sample: { size }, $match: { times_used: { $lt: MAX_TIMES_USED } } }
    ]);
    return getResponse(StatusCodes.OK, undefined, testQuestions);
  } catch (error: any) {
    return getResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const submitQuestions = async (answers: IUserTestAnswer[]): Promise<ResponseFormat<TestAnswersResponseData>> => {
  try {
    const userAnswers = await UserTestAnswers.insertMany(answers);
    return getResponse(StatusCodes.OK, undefined, userAnswers);
  } catch (error: any) {
    return getResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateQuestionsTimesUsed = async (questionsIds: number[]): Promise<void | ResponseFormat<null>> => {
  try {
    await TestQuestions.updateMany({ question_id: { $in: questionsIds } }, { $inc: { times_used: 1 } });
    return getResponse(StatusCodes.OK);
  } catch (error: any) {
    return getResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getTestSummary = async (
  worker_id: string,
  answers: IUserTestAnswer[],
  duration: number
): Promise<ResponseFormat<UserTest>> => {
  try {
    const rounds = answers.length;
    const profit = answers.reduce((acc, answer) => acc + answer.profit, 0);
    const user = await updateUserTest(worker_id, { rounds, profit, duration });
    return getResponse(StatusCodes.OK, undefined, user.user_test);
  } catch (error: any) {
    return getResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

export { getRandomQuestions, submitQuestions, updateQuestionsTimesUsed, getTestSummary };
