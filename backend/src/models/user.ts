import { pool } from '../db';

export interface User {
  email: string;
  password: string;
  userType: number;
}

export const createUser = async (userData: User): Promise<User | null> => {
  const query = 'INSERT INTO users (email, password, "userType") VALUES ($1, $2, $3) RETURNING *';
  const values = [userData.email, userData.password, userData.userType];

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
