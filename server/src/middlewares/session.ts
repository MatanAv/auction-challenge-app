import config from '@/config';
import MongoStore from 'connect-mongo';
import { Express } from 'express';
import session, { SessionData } from 'express-session';
import { MONGO_URI } from '@/constants/db';

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
      saveUninitialized: false, // don't create session until something stored,
      store: MongoStore.create({ mongoUrl: MONGO_URI }),
      cookie: {
        sameSite: true
      }
    })
  );

export default useSession;
