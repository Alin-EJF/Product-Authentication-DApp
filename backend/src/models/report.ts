import { pool } from '../db';

export interface Report {
  id: number;
  email: string;
  reportDetails: string;
  reportType: string;
  productId: string;
  productName: string;
  manufacturer: string;
  created_at: Date;
}

export const createReport = async (reportData: Report): Promise<Report | null> => {
  const query = 'INSERT INTO reports (user_email, "report_details", "report_type", "product_id", "product_name", "manufacturer") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [reportData.email, reportData.reportDetails, reportData.reportType, reportData.productId, reportData.productName, reportData.manufacturer];
  console.log(values);
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getLastReports = async (reportType: string): Promise<Report[] | null> => {
  const query = 'SELECT * FROM reports WHERE "report_type" = $1 ORDER BY "created_at" DESC LIMIT 5';
  const values = [reportType];

  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error(error);
    return null;
  }
};
