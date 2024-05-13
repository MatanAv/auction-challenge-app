import { StatusCodes } from 'http-status-codes';
import { ResponseFormat } from '@/types/api';
import { getErrorResponse } from '@/utils/api';
import { IUserTest, IUserTraining } from '@/interfaces/user';
import { updateUserTest, updateUserTraining } from './users';
import { IUser } from '@/models/User';
import TestQuestions from '@/models/TestQuestions';
import UserTestAnswers, { IUserTestAnswer } from '@/models/UserTestAnswers';
import {
  BONUS_MULTIPLIER,
  NON_GROUP_MAX_TIMES_USED,
  GROUP_MAX_TIMES_USED,
  TEST_NON_GROUP_QUESTIONS_AMOUNT
} from '@/constants';

const getRandomQuestion = async (): Promise<ResponseFormat> => {
  try {
    const testQuestions = await TestQuestions.aggregate([{ $sample: { size: 1 } }]);
    return { status: StatusCodes.OK, data: testQuestions };
  } catch (error: any) {
    return getErrorResponse(error);
  }
};

const getTestQuestions = async (): Promise<ResponseFormat> => {
  try {
    const nonGroupQuestions = await TestQuestions.aggregate([
      { $match: { times_used: { $lt: NON_GROUP_MAX_TIMES_USED }, group_id: null } },
      { $sample: { size: TEST_NON_GROUP_QUESTIONS_AMOUNT } }
    ]);

    const groupQuestions =
      (
        await TestQuestions.aggregate([
          { $match: { group_id: { $ne: null }, times_used: { $lt: GROUP_MAX_TIMES_USED } } },
          { $group: { _id: '$group_id', questions: { $push: '$$ROOT' } } },
          { $sample: { size: 1 } }
        ])
      )[0]?.questions || [];

    const testQuestions = [...nonGroupQuestions, ...groupQuestions];

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
  await TestQuestions.updateMany({ _id: { $in: questionsIds } }, { $inc: { times_used: 1 } });
};

const getTestSummary = async (
  worker_id: string,
  answers: IUserTestAnswer[],
  duration: number
): Promise<ResponseFormat> => {
  try {
    const rounds = answers.length;
    const profit = answers.reduce((acc, answer) => acc + answer.profit, 0);
    const bonus = profit > 0 ? profit * BONUS_MULTIPLIER : 0;
    const user = (await updateUserTest(worker_id, { rounds, profit, bonus, duration })).data as IUser;
    return { status: StatusCodes.OK, data: user.user_test };
  } catch (error: any) {
    return getErrorResponse(error);
  }
};

const submitTraining = async (worker_id: string, answers: IUserTestAnswer[]): Promise<ResponseFormat> => {
  try {
    await submitQuestions(answers);
    const duration = answers.reduce((acc, answer) => acc + answer.duration, 0);
    return await updateUserTraining(worker_id, { rounds: answers.length, duration });
  } catch (error: any) {
    return getErrorResponse(error);
  }
};

const submitTest = async (worker_id: string, answers: IUserTestAnswer[]): Promise<ResponseFormat> => {
  try {
    await submitQuestions(answers);
    const duration = answers.reduce((acc, answer) => acc + answer.duration, 0);
    await updateQuestionsTimesUsed(answers);
    return await getTestSummary(worker_id, answers, duration);
  } catch (error: any) {
    return getErrorResponse(error);
  }
};

const handleTimeout = async (
  worker_id: string,
  isTraining: boolean,
  results: IUserTraining | IUserTest
): Promise<ResponseFormat> => {
  try {
    return isTraining
      ? await updateUserTraining(worker_id, results as IUserTraining)
      : await updateUserTest(worker_id, results as IUserTest);
  } catch (error: any) {
    return getErrorResponse(error);
  }
};

export { getRandomQuestion, getTestQuestions, submitTraining, submitTest, handleTimeout };
