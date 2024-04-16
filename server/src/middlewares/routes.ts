import { Express } from 'express';
import usersRouter from '@/routes/users';

const useRoutes = (app: Express) => {
  app.use('/api/users', usersRouter);
};

export default useRoutes;
