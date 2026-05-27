import React from "react";
import { MessageCircle } from "lucide-react";

const data = [
  {
    title: "Tahu Putih",
    img: "/assets/tahu13.jpg",
    desc: "Lembut, segar, disimpan dalam air bersih. Dibuat dari kedelai pilihan dan air pegunungan. Cocok untuk gorengan, tumisan, dan kupat tahu.",
  },
  {
    title: "Tahu Panjang",
    img: "/assets/tahu7T.png",
    desc: "Tahu berkualitas dengan bentuk memanjang, tekstur lembut, dan rasa gurih alami. Diproduksi dari kedelai pilihan dan air pegunungan segar. Cocok untuk digoreng, ditumis, atau olahan tradisional lainnya.",
  },
  {
    title: "Tahu Oren",
    img: "/assets/tahu16.jpg",
    desc: "Tahu oren siap saji dengan warna keemasan khas dan unik. Renyah di luar, lembut di dalam. Cocok untuk camilan atau pelengkap makan.",
  },
  {
    title: "Tahu Goreng",
    img: "/assets/tahu14.jpg",
    desc: "Renyah di luar, lembut di dalam. Digoreng dari tahu segar berkualitas, siap dinikmati kapan saja! Cocok untuk lauk atau camilan.",
  },
];

const Header = () => {
  return (
    <section id="category" className="bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
    
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2">
            <span className="text-gray-600">Our</span>{" "}
            <span className="text-yellow-500">Category</span>
          </h2>
          <p className="text-gray-700 text-sm md:text-base">
            "Varian Tahu Khas Magelang"
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-44 object-cover"
              />

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg mb-2">
                  {item.title}
                </h3>

                {/* 🔥 TEXT FIX */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 overflow-hidden">
                  {item.desc}
                </p>

                {/* Button */}
                <a
                  href="https://wa.me/6281215658463?text=Halo%20saya%20ingin%20pesan%20tahu"
                  className="mt-auto flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 rounded-lg transition"
                >
                  <MessageCircle size={18} />
                  Pesan
                </a>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Header;