import { Router } from 'express';
import { authMiddleware } from '@/middlewares/auth';
import { submitSurvey } from '@/controllers/survey';

const surveyRouter = Router();

surveyRouter.post('/submit', authMiddleware, async (req, res) => {
  const { worker_id, answers } = req.body;

  const response = await submitSurvey(worker_id, answers);

  res.status(response.status).json(response);
});

/*
surveyRouter.get('/download', async (req, res) => {
  const data: IUserSurveyAnswers[] = await UserSurveyAnswers.find();

  const fields = getCollectionFieldsFromSchema(UserSurveyAnswers.schema);
  const records = data.map(
    record => `${record.worker_id},${record.answer_q1},${record.answer_q2},${record.answer_q3},${record.answer_comment}`
  );

  const csv = [fields.join(','), ...records].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="survey_results.csv"');
  res.send(csv);
});
*/

export default surveyRouter;
