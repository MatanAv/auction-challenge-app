import 'dotenv/config';
import app from '@/config/app';
import config from '@/config';
import connectDB from '@/config/db';

connectDB();

app.listen(config.app.port, () => {
  console.log(`Server is running on port ${config.app.port}...`);
});
