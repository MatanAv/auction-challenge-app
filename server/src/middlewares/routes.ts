import { Express } from 'express';
import usersRouter from '@/routes/users';
import surveyRouter from '@/routes/survey';
import testsRouter from '@/routes/tests';

const useRoutes = (app: Express) => {
  app.use('/api/users', usersRouter);
  app.use('/api/surveys', surveyRouter);
  app.use('/api/tests', testsRouter);
};

export default useRoutes;
