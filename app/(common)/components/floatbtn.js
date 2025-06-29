"use client";

import { MessageCircle, X, Home, Newspaper, Mail } from "lucide-react";
import { useState } from "react";

const FloatingButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {isChatOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-lg rounded-2xl p-5 w-80 border border-blue-600">
          {/* Header */}
          <div className="flex justify-between items-center pb-3 mb-3 border-b border-blue-400">
            <h3 className="text-lg font-semibold">hexnode</h3>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:text-gray-300"
            >
              <X size={20} />
            </button>
          </div>

          {/* Welcome message */}
          <div className="mb-4">
            <h4 className="text-base font-medium">Good Day!</h4>
            <p className="text-sm text-gray-200">How can we help?</p>
          </div>

          {/* Send message button */}
          <button className="w-full mb-4 bg-white text-blue-600 font-medium py-2 px-4 rounded-md hover:bg-gray-200 transition duration-200">
            Send us a message
          </button>

          <div className="border-t border-blue-400 pt-3">
            <h4 className="text-sm font-semibold mb-2">Featured Article</h4>
            <div className="flex items-center space-x-2">
              <img
                src="/amt.jpg"
                alt="Featured"
                className="w-10 h-10 rounded-md bg-gray-300"
              />
              <p className="text-sm">Latest Updates</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-blue-400">
            <ul className="space-y-2">
              <li className="flex items-center text-sm hover:text-gray-200 cursor-pointer">
                <Home size={14} className="mr-2" /> Home
              </li>
              <li className="flex items-center text-sm hover:text-gray-200 cursor-pointer">
                <Mail size={14} className="mr-2" /> Messages
              </li>
              <li className="flex items-center text-sm hover:text-gray-200 cursor-pointer">
                <Newspaper size={14} className="mr-2" /> News
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <MessageCircle size={20} />
      </button>
    </>
  );
};

export default FloatingButton;
