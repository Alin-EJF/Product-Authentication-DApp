import { pool } from '../db';
import { User } from './user';

export interface Provider extends User{
  CIF : string;
  trade_register_number : string;
  legal_name : string;
  phone_number : number;
}

export const createProvider = async (providerData: Provider): Promise<Provider | null> => {
  const query = 'INSERT INTO provider_users (email, password, "userType", "CIF", trade_register_number, legal_name, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const values = [providerData.email, providerData.password, providerData.userType, providerData.CIF, providerData.trade_register_number, providerData.legal_name, providerData.phone_number];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const findProviderByEmail = async (email: string): Promise<Provider | null> => {
  const query = 'SELECT * FROM provider_users WHERE email = $1';
  const values = [email];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};