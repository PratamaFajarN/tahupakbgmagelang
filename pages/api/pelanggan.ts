// pages/api/pelanggan.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { id_pasar } = req.query; // ambil dari query ?id_pasar=...

      if (!id_pasar) {
        return res.status(400).json({ message: 'id_pasar wajib dikirim' });
      }

      const [rows] = await pool.query(
        'SELECT * FROM pelanggan WHERE id_pasar = ?',
        [id_pasar] // gunakan prepared statement biar aman dari SQL Injection
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
