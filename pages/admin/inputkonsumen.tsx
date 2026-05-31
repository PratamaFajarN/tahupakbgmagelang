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
  const [transaksiList, setTransaksiList] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const [today, setToday] = useState("");

  // 🔐 AUTH
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");

    if (!isLoggedIn || !role) {
      router.replace("/Login");
      return;
    }

    setToday(dayjs().locale("id").format("dddd, D MMMM YYYY"));
  }, [router]);

  // 🔹 Fetch pasar
  useEffect(() => {
    fetch("https://api.tahupakbgmagelang.xyz/api/pasar")
      .then((res) => res.json())
      .then((res) => setPasarList(res.data || []))
      .catch(console.error);
  }, []);

  // 🔹 Fetch transaksi (UNTUK PREFILL)
  useEffect(() => {
    fetch("https://api.tahupakbgmagelang.xyz/api/gettransaksi")
      .then((res) => res.json())
      .then((res) => setTransaksiList(res.data || []))
      .catch(console.error);
  }, []);

  // 🔹 Fetch pelanggan
  useEffect(() => {
    if (!selectedPasar) return;

    setLoadingData(true);

    fetch(
      `https://api.tahupakbgmagelang.xyz/api/pelanggan?id_pasar=${selectedPasar.id_pasar}`
    )
      .then((res) => res.json())
      .then((res) => setPelangganList(res.data || []))
      .catch(console.error)
      .finally(() => setLoadingData(false));
  }, [selectedPasar]);

  // 🔥 PREFILL DATA (ambil transaksi terakhir)
  useEffect(() => {
    if (!selectedPasar || transaksiList.length === 0) return;

    const filtered = transaksiList.filter(
      (t) => t.id_pasar === selectedPasar.id_pasar
    );

    const latestMap = new Map();

    filtered.forEach((t) => {
      const prev = latestMap.get(t.id_pelanggan);
      if (!prev || new Date(t.tanggal) > new Date(prev.tanggal)) {
        latestMap.set(t.id_pelanggan, t);
      }
    });

    const newForm: Record<number, FormItem> = {};

    latestMap.forEach((t) => {
      newForm[t.id_pelanggan] = {
        pembayaran: t.pembayaran || 0,
        status: t.status === "Lunas" ? "Lunas" : "Belom Lunas",
        catatan: t.keterangan || "",
      };
    });

    setFormData(newForm);
  }, [selectedPasar, transaksiList]);

  // 🔹 Handle change
  const handleChange = (
    id: number,
    field: keyof FormItem,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        pembayaran:
          field === "pembayaran"
            ? Number(value || 0)
            : prev[id]?.pembayaran || 0,
        status:
          field === "status"
            ? (value as "Lunas" | "Belom Lunas")
            : prev[id]?.status || "Belom Lunas",
        catatan:
          field === "catatan"
            ? value
            : prev[id]?.catatan || "",
      },
    }));
  };

  // 🔹 Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const role = localStorage.getItem("role");

    if (!selectedPasar) return alert("Pilih pasar!");
    if (!role) return alert("Login ulang!");

    const dataToSend = Object.keys(formData).map((id) => ({
      id_pelanggan: Number(id),
      pembayaran: formData[Number(id)].pembayaran || 0,
      status: formData[Number(id)].status,
      keterangan: formData[Number(id)].catatan,
      tanggal: new Date().toISOString().split("T")[0],
      nama_user: role,
    }));

    if (dataToSend.length === 0)
      return alert("Isi minimal 1 data!");

    try {
      setLoading(true);

      await fetch(
        "https://api.tahupakbgmagelang.xyz/api/transaksi",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      );

      alert("Berhasil disimpan");
      router.push("/admin/dashboard");
    } catch {
      alert("Gagal simpan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* NAV */}
      <nav className="bg-black p-4">
        <Link href="/admin/dashboard" className="text-yellow-400 font-bold">
          Dashboard
        </Link>
      </nav>

      <div className="p-6 space-y-6">

        {/* PASAR */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h1 className="text-yellow-400 text-xl font-bold">
            Input Pembayaran - {today}
          </h1>

          <select
            className="mt-4 w-full bg-gray-900 p-2 rounded"
            onChange={(e) => {
              const selected = pasarList.find(
                (p) => p.id_pasar === Number(e.target.value)
              );
              setSelectedPasar(selected || null);
            }}
          >
            <option value="">Pilih Pasar</option>
            {pasarList.map((p) => (
              <option key={p.id_pasar} value={p.id_pasar}>
                {p.Nama_Pasar}
              </option>
            ))}
          </select>
        </div>

        {/* FORM */}
        {selectedPasar && (
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-yellow-400 font-bold mb-4">
              {selectedPasar.Nama_Pasar}
            </h2>

            {loadingData ? (
              <p>Loading...</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">

                  {pelangganList.map((p) => (
                    <div key={p.id_pelanggan} className="bg-gray-900 p-4 rounded">

                      <p className="text-yellow-300 font-semibold">
                        {p.Nama_Pelanggan}
                      </p>

                      <input
                        type="number"
                        value={formData[p.id_pelanggan]?.pembayaran || ""}
                        onChange={(e) =>
                          handleChange(
                            p.id_pelanggan,
                            "pembayaran",
                            e.target.value
                          )
                        }
                        className="w-full mt-2 p-2 bg-gray-800 rounded"
                      />

                      <select
                        value={
                          formData[p.id_pelanggan]?.status ||
                          "Belom Lunas"
                        }
                        onChange={(e) =>
                          handleChange(
                            p.id_pelanggan,
                            "status",
                            e.target.value
                          )
                        }
                        className="w-full mt-2 p-2 bg-gray-800 rounded"
                      >
                        <option value="Lunas">Lunas</option>
                        <option value="Belom Lunas">
                          Belom Lunas
                        </option>
                      </select>

                      <textarea
                        value={
                          formData[p.id_pelanggan]?.catatan || ""
                        }
                        onChange={(e) =>
                          handleChange(
                            p.id_pelanggan,
                            "catatan",
                            e.target.value
                          )
                        }
                        className="w-full mt-2 p-2 bg-gray-800 rounded"
                      />

                    </div>
                  ))}

                  <button
                    type="submit"
                    className="bg-yellow-400 text-black px-4 py-2 rounded"
                    disabled={loading}
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