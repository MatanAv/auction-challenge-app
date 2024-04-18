import { Router } from 'express';
import TestQuestions from '@/models/TestQuestions';

const testsRouter = Router();

testsRouter.get('/get-questions', async (req, res) => {
  // request has a sample count/how many questions to return
  // ensure random question is returned
});

testsRouter.post('/submit', async (req, res) => {
  // ensure 25 questions are answered
  // return score & approval key
});

export default testsRouter;
