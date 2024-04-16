import express from 'express';
import config from '@/config';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(config.app.port, () => {
  console.log(`Server is running on port ${config.app.port}...`);
});

export default app;
