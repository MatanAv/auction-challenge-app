import { Router } from 'express';
import { authMiddleware } from '@/middlewares/auth';
import { getRandomQuestion, getTestQuestions, submitTraining, submitTest, handleTimeout } from '@/controllers/tests';

const testsRouter = Router();

testsRouter.get('/questions/training', authMiddleware, async (req, res) => {
  const response = await getRandomQuestion();

  res.status(response.status).json(response);
});

testsRouter.get('/questions/test', authMiddleware, async (req, res) => {
  const response = await getTestQuestions();

  res.status(response.status).json(response);
});

testsRouter.post('/submit/training', authMiddleware, async (req, res) => {
  const { worker_id, answers } = req.body;

  const response = await submitTraining(worker_id, answers);

  res.status(response.status).json(response);
});

testsRouter.post('/submit/test', authMiddleware, async (req, res) => {
  const { worker_id, answers } = req.body;

  const response = await submitTest(worker_id, answers);

  res.status(response.status).json(response);
});

testsRouter.post('/timeout', authMiddleware, async (req, res) => {
  const { worker_id, isTraining, results } = req.body;

  const response = await handleTimeout(worker_id, isTraining, results);

  res.status(response.status).json(response);
});

export default testsRouter;
