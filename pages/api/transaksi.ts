import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const data = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ message: "Data harus berupa array" });
    }

    const values = data.map(
      (item) => `(
        ${pool.escape(item.id_pelanggan)}, 
        ${pool.escape(item.pembayaran)}, 
        ${pool.escape(item.status)}, 
        ${pool.escape(item.keterangan)}, 
        ${pool.escape(item.tanggal)},
        ${pool.escape(item.nama_user)}
      )`
    );

    const sql = `
      INSERT INTO transaksi 
      (id_pelanggan, pembayaran, status, keterangan, tanggal, nama_user)
      VALUES ${values.join(", ")}
      ON DUPLICATE KEY UPDATE 
        pembayaran = VALUES(pembayaran),
        status = VALUES(status),
        keterangan = VALUES(keterangan),
        tanggal = VALUES(tanggal),
        nama_user = VALUES(nama_user)
    `;

    await pool.query(sql);

    res.status(200).json({ message: "Transaksi berhasil disimpan" });
  } catch (err: any) {
    console.error("Error insert transaksi:", err);
    res.status(500).json({
      message: "Terjadi kesalahan server",
      error: err.message,
    });
  }
}