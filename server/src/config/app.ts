import express from 'express';
import cors from 'cors';
import useRoutes from '@/middlewares/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

useRoutes(app);

export default app;
