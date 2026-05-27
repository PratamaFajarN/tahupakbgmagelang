import React from "react";

const Cta = () => {
  return (
    <div   
      className="relative bg-cover bg-center bg-fixed flex items-center justify-center py-20 px-4"
      style={{
        backgroundImage: "url('/assets/tahu31.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-2xl">
        
        <h2 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">
          Tahu Putih Lembut & Gurih <br className="hidden md:block" />
          Asli Magelang!
        </h2>

        <p className="text-sm md:text-lg text-gray-200 mb-6">
          Cocok untuk gorengan, tumisan, dan usaha kuliner.
        </p>

        <a
          href="https://wa.me/6281215658463?text=Halo%20saya%20mau%20order%20tahu"
          className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300 w-full sm:w-auto"
        >
          <span>Klik WhatsApp & Order Hari Ini!</span>
        </a>

      </div>
    </div>
  );
};

export default Cta;