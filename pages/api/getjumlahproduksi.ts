import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      message: `Method ${req.method} Not Allowed`,
    });
  }

  try {
    const [rows] = await pool.query(
       `SELECT 
    pelanggan.Nama_Pelanggan,
    jumlah_produksi.jumlah,jumlah_produksi.jumlah_tahugoreng,jumlah_produksi.jumlah_tahugorengkencong
   FROM pelanggan
   JOIN jumlah_produksi 
     ON pelanggan.id_pelanggan = jumlah_produksi.id_pelanggan;`
     
    );

    return res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error: any) {
    console.error("ERROR API:", error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data",
    });
  }
}