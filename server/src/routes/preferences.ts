import { Router } from 'express';
import { authMiddleware } from '@/middlewares/auth';
import { submitPreferences } from '@/controllers/preferences';

const preferencesRouter = Router();

preferencesRouter.post('/submit', authMiddleware, async (req, res) => {
    const { worker_id, answers } = req.body;

    const response = await submitPreferences(worker_id, answers);

    res.status(response.status).json(response);
});

export default preferencesRouter;
