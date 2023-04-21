import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  password: '2750',
  host: '127.0.0.1',
  port: 5432, // default PostgreSQL port
  database: 'postgres'
});
