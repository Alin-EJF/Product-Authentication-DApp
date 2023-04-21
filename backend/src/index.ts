import express, { Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import { pool } from './db';
import authRoutes from './routes/authRoutes';

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
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/test', (req: Request, res: Response) => {
  res.json('test ook');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});



// Check the database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database!');

  client.query('SELECT * from users;', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('from db:', result.rows);
  });
});