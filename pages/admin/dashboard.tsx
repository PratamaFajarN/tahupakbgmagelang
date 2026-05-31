import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import "dayjs/locale/id";

/* ================= TYPES ================= */

interface Transaksi {
  id_transaksi: number;
  Nama_Pelanggan: string;
  pembayaran: number;
  status?: "Lunas" | "Belom_Lunas";
  Nama_Pasar?: string;
  keterangan: string;
  nama_user: string;
}

interface Produksi {
  Nama_Pelanggan: string;
  jumlah: number;
  jumlah_tahugoreng: number;
  jumlah_tahugorengkencong: number;
}

/* ================= PAGE ================= */

export default function Dashboard() {
  const router = useRouter();

  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [today, setToday] = useState("");
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
  const [lunas, setLunas] = useState<any[]>([]);
  const [belumLunas, setBelumLunas] = useState<any[]>([]);
  const [produksi, setProduksi] = useState<Produksi[]>([]);

  /* ================= AUTH ================= */

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const roleFromStorage = localStorage.getItem("role");

    if (!isLoggedIn || !roleFromStorage) {
      router.replace("/Login");
      return;
    }

    setRole(roleFromStorage);
    setToday(dayjs().locale("id").format("dddd, D MMMM YYYY"));
    setLoading(false);
  }, [router]);

  /* ================= FETCH ================= */

useEffect(() => {
  fetch("https://api.tahupakbgmagelang.xyz/api/gettransaksi")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response error");
      }
      return res.json();
    })
    .then((res) => {
      setTransaksi(res.data || []);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
}, []);

  useEffect(() => {
    fetch("https://api.tahupakbgmagelang.xyz/api/getjumlahproduksi")
      .then((r) => r.json())
      .then((d) => setProduksi(d?.data || []));
  }, []);

  useEffect(() => {
    fetch("https://api.tahupakbgmagelang.xyz/api/getsatuslunas")
      .then((r) => r.json())
      .then((d) => setLunas(d?.data || []));

    fetch("https://api.tahupakbgmagelang.xyz/api/getstatubelumlunas")
      .then((r) => r.json())
      .then((d) => setBelumLunas(d?.data || []));
  }, []);

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat("id-ID").format(val);

  const handleLogout = () => {
    localStorage.clear();
    router.replace("/");
  };

  const handleInput = () => router.push("/admin/inputkonsumen");
  const handleInputProduksi = () =>
    router.push("/admin/inputjumlahproduksi");

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-3 sm:p-5 space-y-6">

      {/* ================= HEADER (UPGRADED) ================= */}
      <header className="bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center">

        <div className="flex items-center gap-4">

          {/* LOGO BOX */}
          <div className="
            relative w-12 h-12
            rounded-2xl
            bg-gradient-to-br from-yellow-400/20 to-yellow-600/10
            border border-yellow-400/30
            flex items-center justify-center
            shadow-lg
            hover:scale-105 transition
          ">
            <img
              src="/assets/pakBG.png"
              className="w-9 h-9 rounded-xl"
            />

            <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
          </div>

          {/* TEXT */}
          <div>
            <h1 className="text-xl font-bold text-yellow-400">
              Dashboard
            </h1>
            <p className="text-xs text-gray-400">
              Management Produksi Tahu
            </p>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded-xl text-sm hover:scale-105 transition"
        >
          Logout
        </button>

      </header>

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

        <GlassCard title="Total" value={transaksi.length} type="yellow" />
        <GlassCard title="Lunas" value={lunas.length} type="green" />
        <GlassCard title="Belum" value={belumLunas.length} type="red" />

      </div>

      {/* ================= BUTTON ================= */}
      <div className="flex justify-center">
        <button
          onClick={handleInput}
          className="bg-yellow-400 text-black font-semibold p-3 rounded-xl w-full sm:w-auto hover:scale-105 transition"
        >
          Input Konsumen
        </button>
      </div>

      {/* ================= TRANSAKSI ================= */}
      <Section title={   <span className="text-yellow-400 font-bold">
      {`TRANSAKI - ${today}`}
    </span>}>

        <div className="grid gap-3 md:hidden">
          {transaksi.map((item, i) => (
            <div
              key={item.id_transaksi}
              className="
                bg-gradient-to-br from-gray-900 via-gray-800 to-black
                border border-white/10
                p-4 rounded-2xl
                hover:scale-[1.03]
                hover:border-yellow-400/30
                transition
              "
            >
              <div className="flex justify-between text-xs text-gray-400">
                <span>#{i + 1}</span>
                <span className={item.status === "Lunas" ? "text-green-400" : "text-red-400"}>
                  {item.status}
                </span>
              </div>

              <p className="text-yellow-400 font-bold">
                {item.Nama_Pelanggan}
              </p>

              <p>Rp {formatRupiah(item.pembayaran)}</p>
              <p className="text-xs text-gray-400">{item.Nama_Pasar}</p>
              <p className="text-xs">{item.keterangan}</p>
              <p className="text-xs text-gray-500">{item.nama_user}</p>
            </div>
          ))}
        </div>

      </Section>

      {/* ================= PERBANDINGAN ================= */}
      <Section title="Perbandingan Lunas vs Belum">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <MiniCard title="✔ Lunas" color="green" data={lunas} />
          <MiniCard title="✖ Belum" color="red" data={belumLunas} />

        </div>

      </Section>
          {/* ================= BUTTON INPUT PRODUKSI ================= */}
{role === "FAJAR" && (
  <div className="flex justify-center">
    <button
      onClick={handleInputProduksi}
      className="
        bg-yellow-400 text-black font-semibold
        p-3 rounded-xl w-full sm:w-auto
        hover:scale-105 transition
      "
    >
      Input Jumlah Produk
    </button>
  </div>
)}
      {/* ================= PRODUKSI (SAMA STYLE TRANSAKSI) ================= */}
      <Section title={   <span className="text-yellow-400 font-bold">
      {`JUMLAH MUATAN TAHU HARI INI - ${today}`}
    </span>}>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

          {produksi.map((item, i) => (
            <div
              key={i}
              className="
                bg-gradient-to-br from-gray-900 via-gray-800 to-black
                border border-white/10
                p-4 rounded-2xl
                hover:scale-[1.04]
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.7)]
                hover:border-blue-400/30
                transition
                cursor-pointer
              "
            >
              <p className="text-yellow-400 font-bold">
                {item.Nama_Pelanggan}
              </p>

              <div className="text-xs mt-2 space-y-1">
                <p>Putih: <span className="text-yellow-300">{item.jumlah}</span></p>
                <p>Goreng: <span className="text-green-400">{item.jumlah_tahugoreng}</span></p>
                <p>Kencong: <span className="text-blue-400">{item.jumlah_tahugorengkencong}</span></p>
              </div>
            </div>
          ))}

        </div>

      </Section>

    </div>
  );
}

/* ================= GLASS CARD ================= */

function GlassCard({ title, value, type }: any) {
  const color =
    type === "green"
      ? "from-green-500/20 border-green-400/30 text-green-300"
      : type === "red"
      ? "from-red-500/20 border-red-400/30 text-red-300"
      : "from-yellow-500/20 border-yellow-400/30 text-yellow-300";

  return (
    <div
      className={`
        bg-gradient-to-br ${color}
        border rounded-2xl p-5
        hover:scale-105 transition
      `}
    >
      <p className="text-xs text-gray-300">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

/* ================= MINI CARD ================= */

function MiniCard({ title, color, data }: any) {
  return (
    <div className={`p-4 rounded-2xl border ${
      color === "green"
        ? "border-green-400/30 bg-green-500/10"
        : "border-red-400/30 bg-red-500/10"
    }`}>

      <h3 className={color === "green" ? "text-green-400" : "text-red-400"}>
        {title}
      </h3>

      <div className="mt-2 space-y-2 max-h-52 overflow-auto">
        {data.map((d: any, i: number) => (
          <div key={i} className="text-xs bg-white/5 p-2 rounded-lg">
            {d.nama_pelanggan}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= SECTION ================= */

function Section({ title, children }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
      <h2 className="text-xs text-gray-400 mb-3">{title}</h2>
      {children}
    </div>
  );
}