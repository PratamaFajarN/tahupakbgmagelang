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
      `SELECT pelanggan.nama_pelanggan
       FROM pelanggan
       INNER JOIN transaksi 
       ON pelanggan.id_pelanggan = transaksi.id_pelanggan
       WHERE transaksi.status = ?`,
      ["Belom lunas"]
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