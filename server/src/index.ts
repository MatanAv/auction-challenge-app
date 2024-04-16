if (process.env.NODE_ENV !== 'development') {
  require('module-alias/register');
}

import 'dotenv/config';
import express from 'express';
import config from '@/config';
import connectDB from '@/config/db';

const app = express();

connectDB();

app.listen(config.app.port, () => {
  console.log(`Server is running on port ${config.app.port}...`);
});
