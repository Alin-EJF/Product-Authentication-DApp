import express, { Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';

const app = express();

const allowedOrigins = ['http://127.0.0.1:5173', 'http://localhost:5173'];

const corsOptions: CorsOptions = {
  credentials: true,
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.get('/test', (req: Request, res: Response) => {
  res.json('test ook');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
