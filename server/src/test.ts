import UserTestAnswers from '@/models/UserTestAnswers';
import User from '@/models/User';
import TestQuestions from '@/models/TestQuestions';
import UserSurveyAnswers from '@/models/UserSurveyAnswers';

/*

import { dbTest } from './test';

connectDB().then(() => dbTest());

*/

const dbTest = async () => {
  try {
    // create a user
    const user = await User.create({ worker_id: '123' });
  } catch (error: any) {
    console.log(error.errorResponse.errmsg);
  }
  // const { _id } = (await User.findOne({ worker_id: '123' }).select('_id'))!;
  // console.log(_id.toString());

  // const user = await User.findById(_id);
  // console.log(user);

  // // get a test question
  // const testQuestion = (await TestQuestions.findOne({ question_id: 1 }))!;

  // // create a userAnswer
  // // const userAnswer = await UserTestAnswers.create({
  // //   worker: user._id,
  // //   question: testQuestion._id,
  // //   is_training: false,
  // //   round: 1,
  // //   answer: 'a',
  // //   profit: 100,
  // //   duration: 10
  // // });

  // // get userAnswer
  // const userAnswer = (await UserTestAnswers.findOne({ worker: user._id, question: testQuestion._id }))!;
  // const worker = userAnswer.worker as any;

  // console.log(worker.worker_id);
};

export { dbTest };
