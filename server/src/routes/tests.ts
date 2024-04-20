import { Router } from 'express';
import { authMiddleware } from '@/middlewares/auth';
import { updateUserTraining } from '@/controllers/users';
import { getRandomQuestions, submitQuestions, getTestSummary } from '@/controllers/tests';

const testsRouter = Router();

testsRouter.get('/get-questions', authMiddleware, async (req, res) => {
  const { size } = req.body;

  const response = await getRandomQuestions(size);

  res.status(response.status).json(response);
});

testsRouter.post('/submit/training', authMiddleware, async (req, res) => {
  const { worker_id, answers, duration } = req.body;

  await submitQuestions(answers);

  const response = await updateUserTraining(worker_id, { rounds: answers.length, duration });

  res.status(response.status).json(response);
});

testsRouter.post('/submit/test', authMiddleware, async (req, res) => {
  const { worker_id, answers, duration } = req.body;

  await submitQuestions(answers);

  const response = await getTestSummary(worker_id, answers, duration);

  res.status(response.status).json(response);
});

export default testsRouter;
