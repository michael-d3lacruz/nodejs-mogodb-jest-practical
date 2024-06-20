import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 5000;
const env = process.env.APP_ENV || 'dev';

app.use(cors()); 
app.use(morgan(env));
app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
