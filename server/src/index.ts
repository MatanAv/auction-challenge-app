if (process.env.NODE_ENV !== 'development') {
  require('module-alias/register');
}

import 'dotenv/config';
import express from 'express';
import config from '@/config';
import connectDB from '@/config/db';
import cors from 'cors';

const app = express();

connectDB();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(config.app.port, () => {
  console.log(`Server is running on port ${config.app.port}...`);
});
