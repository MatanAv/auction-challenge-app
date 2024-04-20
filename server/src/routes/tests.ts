import { Router } from 'express';
import { authMiddleware } from '@/middlewares/auth';
import { getRandomQuestions, submitQuestions } from '@/controllers/tests';

const testsRouter = Router();

testsRouter.get('/get-questions', authMiddleware, async (req, res) => {
  const { size } = req.body;

  const response = await getRandomQuestions(size);

  res.status(response.status).json(response);
});

testsRouter.post('/submit/training', authMiddleware, async (req, res) => {
  const { answers } = req.body;

  const response = await submitQuestions(answers);

  res.status(response.status).json(response);
});

testsRouter.post('/submit/test', authMiddleware, async (req, res) => {
  const { answers } = req.body;

  const response = await submitQuestions(answers);

  res.status(response.status).json(response);
});

export default testsRouter;
