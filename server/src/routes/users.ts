import { Router } from 'express';
import User from '@/models/User';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  res.json({ data: await User.find() });
});

userRouter.post('/', async (req, res) => {
  const user = await User.create({
    _id: 'user1'
  });

  res.json({ data: user });
});

export default userRouter;
