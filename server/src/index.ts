import 'dotenv/config';
import config from '@/config';
import connectDB from '@/config/db';
import app from '@/config/app';

connectDB();

app.listen(config.app.port, () => {
  console.log(`Server is running on port ${config.app.port}...`);
});
