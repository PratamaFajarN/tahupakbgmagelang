import React from "react";

const Lokasi = () => {
  return (
    <section id="lokasi">
      <div className="flex flex-col items-center  bg-gray-100 p-10">
        {/* Header Section */}
        <div className="max-w-4xl text-center px-4">
        <h2
            className="text-2xl md:text-4xl lg:text-6xl font-bold mb-2"
            style={{ color: "#f7b030" }}
          >
            <span className="text-gray-600">Lok</span>asi
          </h2>
            
        </div>
      </div>
      
      <div className="w-full max-w-4xl mx-auto p-3">
  <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden shadow">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.6886970788414!2d110.2332414!3d-7.499579100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a8f00435f3187%3A0x3f651fa4f08b4647!2sTahu%20Pak%20BG%20Magelang!5e0!3m2!1sid!2sid!4v1750127183295!5m2!1sid!2sid"
      className="absolute top-0 left-0 w-full h-full"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>
    </section>
  );
};

export default Lokasi;
