import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];

    if (!data.length) {
      return res.status(400).json({
        success: false,
        message: "Data kosong",
      });
    }

    for (const item of data) {
      const {
        id_pelanggan,
        putih = 0,
        goreng = 0,
        goreng_kencong = 0,
      } = item;

      if (!id_pelanggan) continue;

      await pool.query(
        `
        INSERT INTO jumlah_produksi 
  (id_pelanggan, jumlah, jumlah_tahugoreng, jumlah_tahugorengkencong)
  VALUES (?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
    jumlah = VALUES(jumlah),
    jumlah_tahugoreng = VALUES(jumlah_tahugoreng),
    jumlah_tahugorengkencong = VALUES(jumlah_tahugorengkencong)
  `,
  [id_pelanggan, putih, goreng, goreng_kencong]
      );
    }

    return res.status(200).json({
      success: true,
      message: "Berhasil insert / update produksi",
    });

  } catch (error: any) {
    console.error("ERROR UPSERT:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}