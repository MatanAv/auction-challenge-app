import TestQuestions, { ITestQuestion } from '@/models/TestQuestions';

const getRandomTestQuestions = async (size: number): Promise<ITestQuestion> => {
  const testQuestion = await TestQuestions.aggregate([{ $sample: { size }, $match: { times_used: { $lt: 4 } } }]);

  await TestQuestions.updateOne({ _id: testQuestion[0]._id }, { $inc: { times_used: 1 } });

  return testQuestion[0];
};

// const submitTest = async (workerId: string, testAnswers: ITestQuestion[]): Promise<> => {};

export { getRandomTestQuestions };
