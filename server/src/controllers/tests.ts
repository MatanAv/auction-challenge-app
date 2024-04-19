import TestQuestions, { ITestQuestion } from '@/models/TestQuestions';
import UserTestAnswers, { IUserTestAnswer } from '@/models/UserTestAnswers';

const getRandomQuestions = async (size: number): Promise<ITestQuestion[]> => {
  const testQuestions = await TestQuestions.aggregate([
    {
      $sample: { size },
      $match: { times_used: { $lt: 4 } }
    }
  ]);

  return testQuestions;
};

const submitQuestions = async (answers: IUserTestAnswer[]): Promise<IUserTestAnswer[]> => {
  const userAnswers = await UserTestAnswers.insertMany(answers);
  return userAnswers;
};

export { getRandomQuestions, submitQuestions };
