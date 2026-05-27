import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db'; // koneksi dari db.ts

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const [rows]: any = await pool.query(`
        SELECT 
          transaksi.*,
          pelanggan.Nama_Pelanggan,
          pasar.id_pasar,
          pasar.Nama_Pasar
        FROM transaksi
        INNER JOIN pelanggan
          ON transaksi.id_pelanggan = pelanggan.id_pelanggan
        INNER JOIN pasar
          ON pelanggan.id_pasar = pasar.id_pasar
      `);

      res.status(200).json(rows);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ 
        message: 'Terjadi kesalahan saat ambil data', 
        error: error.message 
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
