import React from "react";
import { WhatsappLogo } from "@phosphor-icons/react";

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/6281215658463" // Ganti dengan nomor kamu
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
    >
      <WhatsappLogo size={32} />
    </a>
  );
};

export default FloatingWhatsApp;
