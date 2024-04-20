import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.worker_id) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
  } else {
    req.body.worker_id = req.session.worker_id;
  }

  next();
};

export { authMiddleware };
