import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.worker_id) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }

  next();
};

export { authMiddleware };
