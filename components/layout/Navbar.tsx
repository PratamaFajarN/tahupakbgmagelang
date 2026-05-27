import React, { useState, useEffect } from "react";
import { List, X } from "@phosphor-icons/react";
import { User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleClick = () => {
    setShowNavbar((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md shadow-md py-2 md:py-3"
          : "bg-transparent py-4 md:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 min-h-[60px] md:min-h-[70px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/pakBG.png"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-lg md:text-xl font-semibold text-yellow-400">
            TahuMagelang
          </span>
        </Link>

        {/* Button Mobile */}
        <button
          onClick={handleClick}
          className="md:hidden text-white"
        >
          {showNavbar ? <X size={28} /> : <List size={28} />}
        </button>

        {/* Menu */}
        <div
          className={`${
            showNavbar
              ? "absolute top-16 left-0 w-full bg-black/95 backdrop-blur-md p-6"
              : "hidden"
          } md:static md:flex md:items-center md:gap-6 md:bg-transparent md:p-0`}
        >
          <ul className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 text-white text-sm md:text-base">

            {["home", "about", "category", "gallery", "lokasi"].map((item) => (
              <li key={item} className="flex items-center">
                <a
                  href={`#${item}`}
                  onClick={() => setShowNavbar(false)}
                  className="py-2 hover:text-yellow-400 transition duration-200 relative after:content-[''] after:block after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}

            {/* Login Button */}
            <li className="flex items-center">
              <Link
                href="/Login"
                className="flex items-center justify-center gap-2 bg-yellow-400 text-black px-4 h-[40px] rounded-lg hover:bg-yellow-500 transition duration-200 font-medium shadow-sm"
              >
                <User size={16} />
                Login
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;