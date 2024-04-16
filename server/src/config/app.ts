import express from 'express';
import cors from 'cors';
import useRoutes from '@/middlewares/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

useRoutes(app);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
