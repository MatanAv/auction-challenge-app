import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createUser } from '@/controllers/users';
import { authMiddleware } from '@/middlewares/auth';

const userRouter = Router();

userRouter.post('/register', async (req, res) => {
  const { worker_id } = req.body;

  try {
    const user = await createUser(worker_id);
    res.status(StatusCodes.CREATED).json({ data: user });
  } catch (error: any) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
  }
});

userRouter.post('/submit/instructions', authMiddleware, async (req, res) => {});

userRouter.post('/submit/training', authMiddleware, async (req, res) => {});

userRouter.post('/submit/test', authMiddleware, async (req, res) => {});

export default userRouter;
