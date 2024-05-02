import express from 'express';
import cors from 'cors';
import useSession from '@/middlewares/session';
import useRoutes from '@/middlewares/routes';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

useSession(app);
useRoutes(app);

app.get('/', (req, res) => {
  res.send('Server is running!');
});

export default app;
