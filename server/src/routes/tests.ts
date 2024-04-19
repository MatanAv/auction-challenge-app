import { Router } from 'express';
import { authMiddleware } from '@/middlewares/auth';

const testsRouter = Router();

testsRouter.get('/get-questions', authMiddleware, async (req, res) => {
  // request has a sample count/how many questions to return
  // ensure random question is returned
});

testsRouter.post('/submit', authMiddleware, async (req, res) => {
  // ensure 25 questions are answered
  // return score & approval key
});

export default testsRouter;
