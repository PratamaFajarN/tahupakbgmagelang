import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Whatsap from "./Whatsap";
import Image from "next/image";

const Sidebar = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  const [bgImage, setBgImage] = useState("assets/banner.png");
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setBgImage("assets/banner1.png"); // untuk mobile
      } else {
        setBgImage("assets/banner.png"); // untuk desktop
      }
    };

    handleResize(); // inisialisasi pertama
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  

  return (
    <section id="home">
      <div
      className="w-full bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${bgImage})` }}
    ><br />
    <br />
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row items-center  gap-10">
          {/* Kolom Kiri - Teks dan Carousel */}
          <div className="w-full lg:w-6/12 text-white text-center lg:text-left px-4">
            <br />
            <br />
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-shadow"
              style={{ color: "white" }}
            >
              TahuPak BG <span style={{color:'#f7b030'}}>Magelang</span>
            </h2>

            {/* Carousel */}
            <div className="w-full flex justify-center lg:justify-start  mb-6">
              <div className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px]">
                <Slider {...settings}>
                  <div>
                    <Image
                      src="/assets/tahu12.jpg"
                     alt="tahu"
  width={400}
  height={300}
                      className="rounded-lg w-full aspect-[4/3] object-cover"
                      style={{ borderBottomRightRadius: '141px',
                               borderTopLeftRadius: '141px', border: '3px solid #f7b030'

                       }}
                      
                    />
                  </div>
                  <div>
                    <Image
                      src="/assets/tahu4.jpg"
                      alt="tahu"
  width={400}
  height={300}
                      className="rounded-lg w-full aspect-[4/3] object-cover"
                      style={{ borderBottomRightRadius: '141px',
                        borderTopLeftRadius: '141px', border: '3px solid #f7b030'

                }}
                    />
                  </div>
                  <div>
                    <Image
                      src="/assets/tahu16.jpg"
                     alt="tahu"
  width={400}
  height={300}
                      className="rounded-lg w-full aspect-[4/3] object-cover shadow-2xl shadow-black/60"
                      style={{ borderBottomRightRadius: '141px',
                        borderTopLeftRadius: '141px', border: '3px solid #f7b030'
                       

                }}
                    />
                  </div>
                </Slider>
              </div>
            </div>

            {/* Paragraf dengan text shadow */}

            <div className="font-semibold justify-start" style={{ textShadow: '10px 10px 10px rgba(5,5,5,5.5)' }}> 
                <p className="text-base sm:text-lg lg:text-xl mb-2 leading-relaxed ">
                      🌿 Tahu Magelang Asli
                                <br />
                ✔️ Lembut & Gurih
                <br />
                ✔️ Diproses dengan air bersih alami
                <br />
                ✔️ Cita rasa khas 
                <br />

                Rasa autentik yang berasal dari alam Magelang.
                            </p>

            </div>
            <br />
           
{/* Tombol WhatsApp */}
            <Whatsap />
            
          </div>
          

          {/* Kolom Kanan Kosong */}
          <div className="w-full lg:w-6/12" />
        </div>
      </div>
    </div>
    </section>
  );
};

export default Sidebar;
