import TestQuestions, { ITestQuestion } from '@/models/TestQuestions';

const getRandomTestQuestion = async (): Promise<ITestQuestion> => {
  const testQuestion = await TestQuestions.aggregate([{ $sample: { size: 1 } }]);

  await TestQuestions.updateOne({ _id: testQuestion[0]._id }, { $inc: { times_used: 1 } });

  return testQuestion[0];
};

// const submitTest = async (workerId: string, testAnswers: ITestQuestion[]): Promise<> => {};

export { getRandomTestQuestion };
