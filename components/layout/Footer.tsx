import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
        {/* Logo & Brand */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src="assets/pakBG.png"
              alt="Logo"
              className="w-16 h-16 rounded-full shadow-lg"
            />
            <h2 className="text-2xl font-bold text-white">Tahu Pak BG</h2>
          </div>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Asli Magelang, terpercaya lebih dari 20 tahun.  
            Gurih, sehat, dan selalu segar untuk Anda.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#home">Home</Link></li>
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/#category">Category</Link></li>
            <li><Link href="/#lokasi">Lokasi</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Layanan</h3>
        

            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/kemitraan" className="hover:text-[#f7b030] transition">
                  Kemitraan
                </Link>
              </li>
              <li>
                <Link href="/reseller" className="hover:text-[#f7b030] transition">
                  Reseller
                </Link>
              </li>
              <li>
                <Link href="/distributor" className="hover:text-[#f7b030] transition">
                  Distributor
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#f7b030] transition">
                  FAQ
                </Link>
              </li>
            </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Kontak Kami</h3>
          <p className="flex items-center gap-2 text-sm"><MapPin size={16}/>Tidar Campur Magelang, Jawa Tengah</p>
          <p className="flex items-center gap-2 text-sm"><Phone size={16}/> +62 812-1565-8463</p>
          <p className="flex items-center gap-2 text-sm"><Mail size={16}/> tahupakbgmagelang.xyz</p>

          {/* Social Media */}
  
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-white font-medium">Tahu Pak BG</span>. All rights reserved.
      </div>
    </footer>
  );
}
