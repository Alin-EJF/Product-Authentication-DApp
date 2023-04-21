import { pool } from '../db';

export interface User {
  id: number;
  email: string;
  password: string;
}

export const createUser = async (email: string, hashedPassword: string): Promise<User | null> => {
  const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
  const values = [email, hashedPassword];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};
