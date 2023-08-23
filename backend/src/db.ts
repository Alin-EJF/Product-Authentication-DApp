import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  password: '',
  host: '127.0.0.1',
  port: 5432, // default PostgreSQL port
  database: 'postgres'
});
