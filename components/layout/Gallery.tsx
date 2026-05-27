import React from 'react';
import Image from "next/image";

const images = [
  "/assets/tahu1.jpg",
  "/assets/tahu3.jpg",
  "/assets/tahu4.jpg",
  "/assets/tahu7T.png",
  "/assets/tahu8.jpg",
  "/assets/tahu9.png",
  "/assets/tahu10.jpg",
  "/assets/tahu11.jpg",
  "/assets/tahu12.jpg",
  "/assets/tahu14.jpg",
  "/assets/tahu16.jpg",
  "/assets/tahu17.jpg",
  "/assets/tahu19.jpg",
  "/assets/tahu90.jpeg",
];

const Gallery = () => {
  return (
    <section id='gallery' className="bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2">
            <span className="text-gray-600">Our</span>{" "}
            <span className="text-yellow-500">Gallery</span>
          </h2>
          <p className="text-gray-700 text-sm md:text-base">
            Galeri Tahu Magelang!
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {images.map((src, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl shadow">
              
              <Image
                src={src}
                alt={`Gallery ${index}`}
                width={400}
                height={300}
                className="w-full h-40 sm:h-48 md:h-52 object-cover transition duration-300 group-hover:scale-110"
              />

              {/* Overlay efek */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition duration-300"></div>

              {/* Optional text hover */}
              <div className="absolute bottom-2 left-2 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                Tahu Pak BG
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Gallery;