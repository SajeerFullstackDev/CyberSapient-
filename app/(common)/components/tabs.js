"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Single App Kiosk");

  const tabs = [
    "Single App Kiosk",
    "Multi-App Kiosk",
    "Web-based Kiosk",
    "Digital Signages",
    "ASAM Kiosk",
  ];

  const tabContent = {
    "Single App Kiosk": [
      "Provision the devices to run one specialized application, with limited functionalities.",
      "Customize the device settings to cater to a specific use-case each time.",
      "Use Hexnode’s Advanced Kiosk settings for additional restrictions or expanded device functionalities while in kiosk mode.",
      "Empower your administrators with full control over the kiosk devices."
    ],
    "Multi-App Kiosk": [
      "Limit device access to approved apps, ensuring focus and productivity.",
      "With default phone and settings app inclusion, reduce distractions by providing users access to essential functions only.",
      "With Hexnode's peripheral settings admins can allow necessary device settings while retaining control.",
      "Simplify device management while empowering user productivity by deploying Multi-App Kiosk Mode."
    ],
    "Web-based Kiosk": [
      "Let users access essential and approved web apps, websites, and files only.",
      "Make the best use of website kiosk with Hexnode's advanced settings.",
      "Tailor your experience to match your unique use case.",
      "From configuring toolbar options to scheduling page refresh, remote debugging, and limiting incognito tabs, take full control of your website kiosk experience."
    ],
    "Digital Signages": [
      "Transform your devices into captivating digital signage kiosks that grab attention.",
      "Engage your audience with vibrant images and seamless video streaming.",
      "Customize media files with trimming, muting, and background music.",
      "Advertise and show off your brand aesthetics to attract customers in different ways.",
      "Take control with Hexnode to reestablish your brand's presence."
    ],
    "ASAM Kiosk": [
      "A feature that empowers your iOS app to seamlessly secure itself in the foreground.",
      "Transform tablets or devices into dedicated point-of-sale (POS) systems by preventing interruptions from other applications or notifications.",
      "Create focused, efficient and secure digital environments to match your requirements.",
      "Configure ASAM effortlessly and elevate your user experience like never before."
    ]
  };

  const tabImages = {
    "Single App Kiosk": "/tabs/single-app-kiosk-image.webp",
    "Multi-App Kiosk": "/tabs/multi-app-kiosk-image.webp",
    "Web-based Kiosk": "/tabs/web-based-kiosk-image.webp",
    "Digital Signages": "/tabs/digital-signage-kiosk-image.webp",
    "ASAM Kiosk": "/tabs/asam-kiosk-image.webp"
  };

  return (
    <div className="bg-gray-100 p-6 sm:p-12">
      <h2 className="text-center text-2xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 mt-3 sm:mt-5">
        Specific kiosk modes for unique use cases
      </h2>

      <div className="flex overflow-x-auto no-scrollbar justify-start sm:justify-center space-x-4 sm:space-x-0  pb-2 sm:pb-0">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-6 sm:px-8 py-2 sm:py-4 text-sm sm:text-xl font-bold focus:outline-none transition-all duration-300 whitespace-nowrap ${
              activeTab === tab
                ? "bg-black text-white rounded-t-lg shadow-lg"
                : "text-gray-600 hover:text-black"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 sm:p-8 shadow-2xl rounded-b-lg mt-2 sm:mt-4 flex flex-col sm:flex-row items-center"
      >
        <div className="sm:w-1/2 space-y-4 sm:space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Powerful {activeTab} solutions for enhanced control
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-lg text-gray-700">
            {tabContent[activeTab]?.map((point, index) => (
              <li key={index} className="flex items-center">
                <span className="text-green-500 text-lg sm:text-xl mr-2">✔️</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:w-1/2 flex justify-center mt-4 sm:mt-0">
          <img
            src={tabImages[activeTab]}
            alt={`${activeTab} Example`}
            className="w-72 sm:w-96 rounded-lg shadow-xl transition-transform transform hover:scale-105"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Tabs;