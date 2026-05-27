import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function About() {
  return (
    <section id="about" className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2">
            <span className="text-gray-600">Abo</span>
            <span className="text-yellow-500">ut</span>
              
          </h2>
          <p className="text-gray-700 text-sm md:text-base">"Produsen tahu Magelang dengan kualitas dan rasa yang konsisten."</p>
          
        </div>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Tahu asli Magelang dari Pak BG, yang telah dipercaya selama lebih dari 20 tahun.
          Kami menghadirkan rasa otentik, dan bahan-bahan terbaik untuk memberikan tahu yang gurih
          dan sehat setiap hari. <br />
          Bergabunglah bersama kami dan rasakan keuntungan besar dari produk tahu yang sudah terbukti kualitasnya!
        </p>

        {/* Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          centeredSlides={true}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500, // ganti kecepatan 2.5 detik
            disableOnInteraction: false, // tetap jalan meski user klik
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              centeredSlides: true,
            },
            640: {
              slidesPerView: 2,
              centeredSlides: true,
            },
            1024: {
              slidesPerView: 3,
              centeredSlides: true,
            },
          }}
          className="max-w-5xl mx-auto"
        >
          <SwiperSlide>
              <div className="w-full h-64 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="/assets/tahu1.jpg"
                  className="w-full h-full object-cover"
                  alt="Tahu Magelang 1"
                />
              </div>
                      </SwiperSlide>
                      <SwiperSlide>
                          <div className="w-full h-64 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="/assets/tahu3.jpg"
                  className="w-full h-full object-cover"
                  alt="Tahu Magelang 1"
                />
              </div>
                      </SwiperSlide>
                      <SwiperSlide>
                          <div className="w-full h-64 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="/assets/tahu4.jpg"
                  className="w-full h-full object-cover"
                  alt="Tahu Magelang 1"
                />
              </div>
                      </SwiperSlide>
                      <SwiperSlide>
              <div className="w-full h-64 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="/assets/tahu5.jpg"
                  className="w-full h-full object-cover"
                  alt="Tahu Magelang 1"
                />
              </div>
              
          </SwiperSlide>
          <SwiperSlide>
              <div className="w-full h-64 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="/assets/tahu6.jpg"
                  className="w-full h-full object-cover"
                  alt="Tahu Magelang 1"
                />
              </div>
              
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
