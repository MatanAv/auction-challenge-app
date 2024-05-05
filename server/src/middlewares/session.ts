import config from '@/config';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { Express } from 'express';
import { MONGO_URI } from '@/constants/db';

declare module 'express-session' {
  interface SessionData {
    worker_id: string;
  }
}

const useSession = (app: Express) => {
  app.set('trust proxy', 1);
  app.use(
    session({
      secret: config.app.session.secret || 'secret-key', // a secret string used to sign the session ID cookie
      resave: false, // don't save session if unmodified
      saveUninitialized: false, // don't create session until something stored,
      store: MongoStore.create({ mongoUrl: MONGO_URI }),
      cookie: {
        maxAge: config.app.session.cookie.maxAge || 1000 * 60 * 60 * 24, // 1 day,
        domain: config.app.session.cookie.domain || 'localhost',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production'
      }
    })
  );
};

export default useSession;
