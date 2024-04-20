import { Router } from 'express';
import { authMiddleware } from '@/middlewares/auth';
import { createUser, updateUserInfo, updateUserInstructions } from '@/controllers/users';

const userRouter = Router();

userRouter.post('/register', async (req, res) => {
  const { worker_id } = req.body;

  const response = await createUser(worker_id);

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
