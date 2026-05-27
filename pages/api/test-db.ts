import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.status(200).json({ message: 'Koneksi berhasil ✅', data: rows });
  } catch (error) {
    console.error('Koneksi gagal ❌', error);
    res.status(500).json({ message: 'Koneksi gagal', error });
  }
}
