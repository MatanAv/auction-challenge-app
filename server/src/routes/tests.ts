import { Router } from 'express';
import TestQuestions from '@/models/TestQuestions';

const testsRouter = Router();

testsRouter.get('/get-question', async (req, res) => {
  // ensure random question is returned
});

testsRouter.post('/submit', async (req, res) => {
  // ensure 25 questions are answered
});

export default testsRouter;
