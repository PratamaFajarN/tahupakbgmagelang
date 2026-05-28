"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import dayjs from "dayjs";
import "dayjs/locale/id";

interface Pasar {
  id_pasar: number;
  Nama_Pasar: string;
}

interface Pelanggan {
  id_pelanggan: number;
  Nama_Pelanggan: string;
}

interface FormItem {
  pembayaran: number;
  status: "Lunas" | "Belom Lunas";
  catatan: string;
}

export default function InputKonsumen() {
  const router = useRouter();
  

  const [pasarList, setPasarList] = useState<Pasar[]>([]);
  const [selectedPasar, setSelectedPasar] = useState<Pasar | null>(null);
  const [pelangganList, setPelangganList] = useState<Pelanggan[]>([]);
  const [formData, setFormData] = useState<Record<number, FormItem>>({});
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const [role, setRole] = useState<string | null>(null);
    
    const [today, setToday] = useState("");
    
  
    // 🔐 AUTH
    useEffect(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const roleFromStorage = localStorage.getItem("role");

  if (!isLoggedIn || !roleFromStorage) {
    router.replace("/Login");
    return; // 🔥 penting
  }

  setRole(roleFromStorage);
  setToday(dayjs().locale("id").format("dddd, D MMMM YYYY"));
}, [router]);

  // 🔹 Fetch pasar
  useEffect(() => {
  const fetchPasar = async () => {
    try {
      const res = await fetch("https://api.tahupakbgmagelang.xyz/api/pasar");

      if (!res.ok) {
        throw new Error("Gagal fetch pasar");
      }

      const result = await res.json();

      // ✅ ambil data yang benar
      setPasarList(result.data || []);
      
    } catch (err) {
      console.error("Error fetch pasar:", err);
    }
  };

  fetchPasar();
}, []);

  // 🔹 Fetch pelanggan
  useEffect(() => {
  if (!selectedPasar) return;

  const fetchPelanggan = async () => {
    try {
      setLoadingData(true);

      const res = await fetch(
        `https://api.tahupakbgmagelang.xyz/api/pelanggan?id_pasar=${selectedPasar.id_pasar}`
      );

      if (!res.ok) throw new Error("Gagal fetch");

      const result = await res.json();

      // ✅ ambil data yang benar
      setPelangganList(result.data || []);

    } catch (err) {
      console.error("Error fetch pelanggan:", err);
    } finally {
      setLoadingData(false);
    }
  };

  fetchPelanggan();
}, [selectedPasar]);

 const handleChange = (
  id: number,
  field: keyof FormItem,
  value: string
) => {
  setFormData((prev) => {
    const current = prev[id] || {
      pembayaran: 0,
      status: "Belom Lunas",
      catatan: "",
    };

    return {
      ...prev,
      [id]: {
        ...current,
        [field]:
          field === "pembayaran" ? Number(value) : value,
      },
    };
  });
};

  // 🔹 Submit
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!selectedPasar) {
    alert("⚠️ Pilih pasar dulu!");
    return;
  }

  // 🔥 ambil langsung dari localStorage (lebih aman dari state)
  const roleFromStorage = localStorage.getItem("role");

  if (!roleFromStorage) {
    alert("⚠️ User tidak ditemukan, login ulang!");
    router.push("/Login");
    return;
  }

  const dataToSend = Object.keys(formData).map((id) => ({
    id_pelanggan: Number(id),
    pembayaran: formData[Number(id)].pembayaran || 0,
    status: formData[Number(id)].status || "Belum",
    keterangan: formData[Number(id)].catatan || "",
    tanggal: new Date().toISOString().split("T")[0],
    nama_user: roleFromStorage, // ✅ FIX UTAMA
  }));

  if (dataToSend.length === 0) {
    alert("⚠️ Isi minimal 1 data!");
    return;
  }

  try {
    setLoading(true);

    console.log("DATA KIRIM:", dataToSend); // 🔍 debug

    const res = await fetch("https://api.tahupakbgmagelang.xyz/api/transaksi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    if (!res.ok) throw new Error();

    alert("✅ Data berhasil disimpan");
    router.push("/admin/dashboard");
  } catch (err) {
    console.error(err);
    alert("❌ Gagal simpan data");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* NAVBAR */}
      <nav className="bg-black border-b border-yellow-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">
          <Link href="/admin/dashboard" className="text-xl font-bold text-yellow-400">
            Dashboard
          </Link>
        </div>
      </nav>

      <div className="p-6 space-y-6">

        {/* PILIH PASAR */}
        <div className="bg-gray-800 border border-yellow-500/20 p-6 rounded-xl">
          <h1 className="text-2xl font-bold text-yellow-400">
            Input Pembayaran
          </h1>
         
          <select
            className="mt-4 w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            onChange={(e) => {
              const selected = pasarList.find(
                (item) => item.id_pasar === Number(e.target.value)
              );
              setSelectedPasar(selected || null);
              setFormData({});
            }}
          >
            <option value="">-- Pilih Pasar --</option>
            {pasarList.map((item) => (
              <option key={item.id_pasar} value={item.id_pasar}>
                {item.Nama_Pasar}
              </option>
            ))}
          </select>
        </div>

        {/* FORM */}
        {selectedPasar && (
          <div className="bg-gray-800 border border-yellow-500/20 p-6 rounded-xl">

            <h2 className="text-xl font-bold text-yellow-400 mb-4">
              Pasar: {selectedPasar.Nama_Pasar}
            </h2>

            {loadingData ? (
              <div className="text-center text-gray-400 animate-pulse">
                Loading pelanggan...
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">

                  {pelangganList.map((p) => (
                    <div
                      key={p.id_pelanggan}
                      className="border border-gray-700 p-4 rounded-xl bg-gray-900 hover:border-yellow-400 transition"
                    >
                      <p className="font-semibold text-yellow-300">
                        {p.Nama_Pelanggan}
                      </p>

                      <input
                        type="number"
                        placeholder="Nominal"
                        className="mt-2 w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                        onChange={(e) =>
                          handleChange(
                            p.id_pelanggan,
                            "pembayaran",
                            e.target.value
                          )
                        }
                      />

                      <select
                        className="mt-2 w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                        defaultValue="Belum"
                        onChange={(e) =>
                          handleChange(
                            p.id_pelanggan,
                            "status",
                            e.target.value
                          )
                        }
                      >
                        <option value="Lunas">Lunas</option>
                        <option value="Belum">Belum</option>
                      </select>
                     

                      <textarea
                        placeholder="Catatan..."
                        className="mt-2 w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                        onChange={(e) =>
                          handleChange(
                            p.id_pelanggan,
                            "catatan",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-yellow-400 text-black font-bold px-4 py-3 rounded-lg hover:bg-yellow-500 transition disabled:opacity-50"
                  >
                    {loading ? "Menyimpan..." : "Simpan"}
                  </button>

                </div>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
}