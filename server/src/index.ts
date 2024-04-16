if (process.env.NODE_ENV !== 'development') {
  require('module-alias/register');
}

import 'dotenv/config';
import './api';
import connectDB from '@/config/db';

connectDB();
