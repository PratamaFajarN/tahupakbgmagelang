// pages/api/pelanggan.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
     

      const [rows] = await pool.query(
        'SELECT * FROM pelanggan ',
       
      );

      res.status(200).json(rows);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan saat ambil data', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
