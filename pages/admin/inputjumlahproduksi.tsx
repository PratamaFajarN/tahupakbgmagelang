import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface Pelanggan {
  id_pelanggan: number;
  Nama_Pelanggan: string;
}

type ProduksiState = {
  [key: string]: {
    putih: string | number;
    goreng: string | number;
    goreng_kencong: string | number;
  };
};

export default function InputProduksi() {
  const [pelanggan, setPelanggan] = useState<Pelanggan[]>([]);
  const [produksi, setProduksi] = useState<ProduksiState>({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // 🔥 FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pelRes, prodRes] = await Promise.all([
          fetch("https://api.tahupakbgmagelang.xyz/api/getpelanggan"),
          fetch("https://api.tahupakbgmagelang.xyz/api/getjumlahproduksi"),
        ]);

        const pelJson = await pelRes.json();
        const prodJson = await prodRes.json();

        const pelangganData = pelJson.data || [];
        setPelanggan(pelangganData);

        // 🔥 MAP PRODUKSI BY NAMA
        const mapped: ProduksiState = {};

        (prodJson.data || []).forEach((item: any) => {
          const key = item.Nama_Pelanggan?.trim();
          if (!key) return;

          mapped[key] = {
            putih: item.jumlah ?? "",
            goreng: item.jumlah_tahugoreng ?? "",
            goreng_kencong: item.jumlah_tahugorengkencong ?? "",
          };
        });

        setProduksi({ ...mapped });
      } catch (err) {
        console.error("ERROR FETCH:", err);
      }
    };

    fetchData();
  }, []);

  // 🔥 HANDLE INPUT
  const handleChange = (
    nama: string,
    field: "putih" | "goreng" | "goreng_kencong",
    value: string
  ) => {
    setProduksi((prev) => ({
      ...prev,
      [nama]: {
        putih: prev[nama]?.putih ?? "",
        goreng: prev[nama]?.goreng ?? "",
        goreng_kencong: prev[nama]?.goreng_kencong ?? "",
        [field]: value,
      },
    }));
  };

  // 🔥 CONVERT NUMBER
  const toNumber = (val: string | number | null | undefined): number => {
    if (val === "" || val == null) return 0;
    return Number(val);
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = pelanggan.map((p) => {
        const key = p.Nama_Pelanggan.trim();
        const data = produksi[key] || {};

        return {
          id_pelanggan: p.id_pelanggan,
          putih: toNumber(data.putih),
          goreng: toNumber(data.goreng),
          goreng_kencong: toNumber(data.goreng_kencong),
        };
      });

      const res = await fetch(
        "https://api.tahupakbgmagelang.xyz/api/postjumlahproduksi",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (result.success) {
        alert("Berhasil menyimpan produksi");
        router.push("/admin/dashboard");
      } else {
        alert(result.message || "Gagal menyimpan");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi error server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-10 backdrop-blur bg-black/60 border-b border-yellow-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/admin/dashboard" className="text-yellow-400 font-bold text-lg">
            Dashboard
          </Link>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto p-6">

        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-8">
          Input Produksi
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-6">

            {pelanggan.map((item) => {
              const key = item.Nama_Pelanggan.trim();

              const total =
                Number(produksi[key]?.putih || 0) +
                Number(produksi[key]?.goreng || 0) +
                Number(produksi[key]?.goreng_kencong || 0);

              return (
                <div
                  key={item.id_pelanggan}
                  className="bg-gray-800/70 border border-gray-700 rounded-2xl p-5 shadow-lg hover:shadow-yellow-500/10 transition"
                >
                  {/* HEADER */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-yellow-300">
                      {item.Nama_Pelanggan}
                    </h3>
                    <span className="text-sm text-gray-400">
                      Total: {total}
                    </span>
                  </div>

                  {/* INPUT */}
                  <div className="grid grid-cols-3 gap-3">

                    <div>
                      <label className="text-xs text-gray-400">Putih</label>
                      <input
                        type="number"
                        value={produksi[key]?.putih ?? ""}
                        onChange={(e) =>
                          handleChange(key, "putih", e.target.value)
                        }
                        className="w-full p-2 mt-1 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-400">Goreng</label>
                      <input
                        type="number"
                        value={produksi[key]?.goreng ?? ""}
                        onChange={(e) =>
                          handleChange(key, "goreng", e.target.value)
                        }
                        className="w-full p-2 mt-1 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-400">Kencong</label>
                      <input
                        type="number"
                        value={produksi[key]?.goreng_kencong ?? ""}
                        onChange={(e) =>
                          handleChange(key, "goreng_kencong", e.target.value)
                        }
                        className="w-full p-2 mt-1 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                      />
                    </div>

                  </div>
                </div>
              );
            })}

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-300 transition text-black font-bold p-4 rounded-2xl text-lg shadow-lg"
          >
            {loading ? "Menyimpan..." : "Simpan Semua"}
          </button>

        </form>
      </div>
    </div>
  );
}