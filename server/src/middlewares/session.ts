import { Express } from 'express';
import session, { SessionData } from 'express-session';
import config from '@/config';

declare module 'express-session' {
  interface SessionData {
    worker_id: string;
  }
}

const useSession = (app: Express) =>
  app.use(
    session({
      secret: config.app.session.secret || 'secret-key', // a secret string used to sign the session ID cookie
      resave: false, // don't save session if unmodified
      saveUninitialized: false // don't create session until something stored
    })
  );

export default useSession;
