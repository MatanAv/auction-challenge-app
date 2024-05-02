import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  console.log('authMiddleware Test:');
  console.log(req.sessionID);
  console.log(req.session);
  console.log(req.session.worker_id);

  if (!req.session.worker_id) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
  } else {
    req.body.worker_id = req.session.worker_id;
  }

  next();
};

export { authMiddleware };
