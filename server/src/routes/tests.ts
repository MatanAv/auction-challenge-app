import { Router } from 'express';
import { authMiddleware } from '@/middlewares/auth';
import { getRandomQuestions, submitTraining, submitTest } from '@/controllers/tests';

const testsRouter = Router();

testsRouter.get('/questions', authMiddleware, async (req, res) => {
  const size = Number(req.query.amount);

  const response = await getRandomQuestions(size);

  res.status(response.status).json(response);
});

testsRouter.post('/submit/training', authMiddleware, async (req, res) => {
  const { worker_id, answers, duration } = req.body;

  const response = await submitTraining(worker_id, answers, duration);

  res.status(response.status).json(response);
});

testsRouter.post('/submit/test', authMiddleware, async (req, res) => {
  const { worker_id, answers, duration } = req.body;

  const response = await submitTest(worker_id, answers, duration);

  if (response.data) {
  }

  res.status(response.status).json(response);
});

export default testsRouter;
