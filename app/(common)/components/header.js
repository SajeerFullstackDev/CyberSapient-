"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-black"
      }`}
    >
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 relative">
        {/* Logo */}
        <Image
          src="/logos/brand.png"
          alt="Logo"
          width={150}
          height={150}
          className={`${
            isScrolled ? "filter grayscale-0" : "filter brightness-0 invert"
          }`}
        />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <button
            className="lg:hidden bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
          <button
            className=" lg:hidden bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => router.push("/signup")}
          >
            Signup
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 hover:bg-red-700 hover:shadow-lg active:scale-95"
            onClick={() =>
              router.push("/mobile-device-management/cloud/signup/")
            }
          >
            14 DAY FREE TRIAL
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden text-black transition-transform duration-300 ${
            isMenuOpen ? "rotate-90" : "rotate-0"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ color: "red" }}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Fullscreen Dropdown Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-black py-4 space-y-6 z-40 animate-fade-in">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-red-600 transition-transform duration-300 hover:rotate-90"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={32} />
          </button>
          <button
            onClick={() => {
              router.push("/login");
              setIsMenuOpen(false);
            }}
            className="text-xl hover:text-gray-400"
          >
            Login
          </button>
          <button
            onClick={() => {
              router.push("/signup");
              setIsMenuOpen(false);
            }}
            className="text-xl hover:text-gray-400"
          >
            Signup
          </button>
          <button
            className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition"
            onClick={() => {
              router.push("/mobile-device-management/cloud/signup/");
              setIsMenuOpen(false);
            }}
          >
            14 DAY FREE TRIAL
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
