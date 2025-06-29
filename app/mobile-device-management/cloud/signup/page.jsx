"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
  const [isOpen, setIsOpen] = useState(false);

  // Language options with flags
  const languages = [
    { name: "English", flag: "🇺🇸", region: "North America" },
    { name: "Français", flag: "🇫🇷", region: "Europe" },
    { name: "Deutsch", flag: "🇩🇪", region: "Europe" },
    { name: "Español", flag: "🇪🇸", region: "Europe" },
    { name: "Português", flag: "🇵🇹", region: "Europe" },
    { name: "Русский", flag: "🇷🇺", region: "Europe" },
    { name: "日本語", flag: "🇯🇵", region: "Asia Pacific" },
    { name: "한국어", flag: "🇰🇷", region: "Asia Pacific" },
    { name: "中文", flag: "🇨🇳", region: "Asia Pacific" },
  ];

  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-black">
            <Link href="/">
              {" "}
              <Image
                src="/logos/brand.png" // Replace with the actual path to your icon image
                alt="Logo"
                width={300} // Adjust size as needed
                height={300} // Adjust size as needed</Link>
              />
            </Link>
          </h1>

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center bg-gray-200 px-4 py-2 rounded-md text-black font-semibold bg-transparent"
            >
              🌎 Language <ChevronDown className="ml-2 w-4 h-4" />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border shadow-lg rounded-lg">
                <div className="p-2">
                  <p className="text-xs text-black font-semibold px-2">
                    Choose language
                  </p>
                  {languages.map((lang, index) => (
                    <button
                      key={index}
                      className="flex items-center w-full px-3 py-2 text-sm text-black hover:bg-gray-100"
                    >
                      <span className="mr-2">{lang.flag}</span> {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
      <div className="flex min-h-screen bg-white">
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-black">
              Try Hexnode free for 14 days
            </h2>
            <div className="mt-6 flex space-x-2">
              <input
                type="email"
                placeholder="Your work email"
                className="border border-gray-300 rounded px-4 py-2 w-80 focus:outline-none text-black"
              />
              <button className="bg-red-600 text-white px-4 py-2 rounded font-semibold">
                GET STARTED
              </button>
            </div>
          </div>
          <div className="mt-10 text-sm text-gray-500">
            <p>
              🇺🇸 +1-833-HEXNODE (439-6633) (Toll Free) | 🇬🇧 +44-800-3689920
              (Toll Free)
            </p>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="hidden md:flex flex-col justify-center bg-blue-100 w-1/3 p-10">
          <p className="text-gray-600 italic">
            "It seemed to be in-line with everything we were looking at so
            wasn't a bargain, I was the most impressed with what Hexnode had
            offered compared to the others."
          </p>
          <div className="mt-4 flex items-center space-x-3">
            <img
              src="/chris-robinson.png"
              alt="Chris Robinson"
              className="w-12 h-12 rounded-full"
            />
            <div className="text-black">
              <p className="font-bold">Chris Robinson</p>
              <p className="text-sm text-gray-500">
                Executive Account Manager, NCS
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
