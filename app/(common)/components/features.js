"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const KioskFeatures = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const images = [
    "/slides/effortless-kiosk-deployement-image (1).webp",
    "/slides/customized-interface-image.webp",
    "/slides/power-up-protection-image.webp",
    "/slides/secure-app-ecosystem.webp",
    "/slides/easy-to-use-interface-image.webp",
  ];

  const features = [
    {
      title: "Effortless Kiosk Deployment & Management",
      content:
        "Quickly deploy and manage kiosk-enabled devices with ease. Work with OEM vendors for pre-configured ROMs, ensuring seamless setup and integration right out of the box.",
    },
    {
      title: "Customized Interface for Maximum Brand Visibility",
      content:
        "Craft a unique, locked-down interface tailored to your brand. Showcase products, services, and messages prominently for enhanced engagement and brand recognition.",
    },
    {
      title: "Advanced Remote Compliance & Security Controls",
      content:
        "Remotely update OS versions while keeping devices in kiosk mode. Leverage remote management tools to secure data and prevent unauthorized access in case of loss or theft.",
    },
    {
      title: "Streamlined App Deployment & Management",
      content:
        "Optimize app installations and updates effortlessly. Reduce downtime, enhance security, and improve efficiency with Hexnode’s silent app deployment and update capabilities.",
    },
    {
      title: "User-Friendly Interface for a Hassle-Free Experience",
      content:
        "Provide an intuitive, simplified interface that lets users access only essential settings. Enable a seamless experience without overwhelming end-users with unnecessary options.",
    },
  ];

  return (
    <section className="px-6 py-12 bg-white text-black">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">
        <span className="text-black px-4 py-2 rounded-lg">
          What Additional Possibilities Does the Kiosk Mode Offer?
        </span>
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-50 md:w-1/3">
          <img
            src={images[openSection !== null ? openSection : 0]}
            alt="Kiosk Mode Feature"
            className="rounded-lg shadow-lg transition-all duration-300"
          />
        </div>

        <div className="w-full md:w-1/2 space-y-6">
          {features.map((item, index) => (
            <div key={index}>
              <h3
                className="font-bold text-xl cursor-pointer"
                onClick={() => toggleSection(index)}
              >
                {item.title}
              </h3>
              <AnimatePresence>
                {openSection === index && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-700 text-base mt-3"
                  >
                    {item.content}
                    <br />
                    <Link href="/mobile-device-management/cloud/signup/" passHref>
                      <span className="text-red-500 text-sm font-semibold cursor-pointer mt-2 inline-block">
                        Try for Free &gt;
                      </span>
                    </Link>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KioskFeatures;
