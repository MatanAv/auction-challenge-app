import { Router } from 'express';
import { authMiddleware } from '@/middlewares/auth';
import { createUser, logoutUser, updateUserInfo, updateUserInstructions } from '@/controllers/users';

const userRouter = Router();

userRouter.post('/register', async (req, res) => {
  const { worker_id } = req.body;

  const response = await createUser(worker_id, req);

  res.status(response.status).json(response);
});

userRouter.get('/logout', (req, res) => {
  const response = logoutUser(req);

  res.status(response.status).json(response);
});

userRouter.put('/info', authMiddleware, async (req, res) => {
  const { worker_id, user_info } = req.body;

  const response = await updateUserInfo(worker_id, user_info);

  res.status(response.status).json(response);
});

userRouter.put('/instructions', authMiddleware, async (req, res) => {
  const { worker_id, user_instructions } = req.body;

  const response = await updateUserInstructions(worker_id, user_instructions);

  res.status(response.status).json(response);
});

export default userRouter;
