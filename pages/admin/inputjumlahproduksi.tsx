import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface Pelanggan {
  id_pelanggan: number;
  Nama_Pelanggan: string;
}

type ProduksiState = {
  [key: number]: {
    putih: number;
    goreng: number;
    goreng_kencong: number;
  };
};

export default function InputProduksi() {
  const [pelanggan, setPelanggan] = useState<Pelanggan[]>([]);
  const [loading, setLoading] = useState(false);
  const [produksi, setProduksi] = useState<ProduksiState>({});

  const router = useRouter();

  useEffect(() => {
  fetch("https://api.tahupakbgmagelang.xyz/api/getpelanggan")
    .then((res) => {
      if (!res.ok) throw new Error("Fetch gagal");
      return res.json();
    })
    .then((res) => {
      setPelanggan(res.data || []);
    })
    .catch((err) => {
      console.error(err);
      setPelanggan([]);
    });
}, []);

  const handleChange = (
    id: number,
    field: "putih" | "goreng" | "goreng_kencong",
    value: string
  ) => {
    setProduksi((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value === "" ? 0 : Number(value),
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = pelanggan
        .map((p) => ({
          id_pelanggan: p.id_pelanggan,
          putih: produksi[p.id_pelanggan]?.putih || 0,
          goreng: produksi[p.id_pelanggan]?.goreng || 0,
          goreng_kencong: produksi[p.id_pelanggan]?.goreng_kencong || 0,
        }))
        .filter(
          (item) =>
            item.putih > 0 ||
            item.goreng > 0 ||
            item.goreng_kencong > 0
        );

      const res = await fetch("https://api.tahupakbgmagelang.xyz/api/postjumlahproduksi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert("Berhasil menyimpan produksi");

        setProduksi({});

        // redirect ke dashboard
        router.push("/admin/dashboard");
      } else {
        alert(data.message || "Gagal menyimpan data");
      }
    } catch (error) {
      console.error("ERROR:", error);
      alert("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-10 backdrop-blur bg-black/60 border-b border-yellow-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/admin/dashboard" className="text-yellow-400 font-bold">
            Dashboard
          </Link>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto p-6">

        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-8">
          Input Produksi
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {pelanggan.map((item) => (
            <div
              key={item.id_pelanggan}
              className="bg-gray-800/70 border border-gray-700 rounded-2xl p-5"
            >
              <input
                readOnly
                value={item.Nama_Pelanggan}
                className="w-full p-3 bg-gray-900 text-yellow-300 rounded-xl"
              />

              {/* PUTIH */}
              <input
                type="number"
                placeholder="Tahu Putih"
                value={produksi[item.id_pelanggan]?.putih || ""}
                onChange={(e) =>
                  handleChange(item.id_pelanggan, "putih", e.target.value)
                }
                className="w-full mt-3 p-3 bg-gray-950 border border-gray-700 rounded-xl"
              />

              {/* GORENG */}
              <input
                type="number"
                placeholder="Tahu Goreng"
                value={produksi[item.id_pelanggan]?.goreng || ""}
                onChange={(e) =>
                  handleChange(item.id_pelanggan, "goreng", e.target.value)
                }
                className="w-full mt-3 p-3 bg-gray-950 border border-gray-700 rounded-xl"
              />

              {/* KENCONG */}
              <input
                type="number"
                placeholder="Tahu Goreng Kencong"
                value={produksi[item.id_pelanggan]?.goreng_kencong || ""}
                onChange={(e) =>
                  handleChange(item.id_pelanggan, "goreng_kencong", e.target.value)
                }
                className="w-full mt-3 p-3 bg-gray-950 border border-gray-700 rounded-xl"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black font-bold p-4 rounded-2xl"
          >
            {loading ? "Menyimpan..." : "Simpan Semua"}
          </button>

        </form>
      </div>
    </div>
  );
}