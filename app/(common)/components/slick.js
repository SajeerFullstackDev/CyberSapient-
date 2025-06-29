"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Justin Modrak",
    role: "Technology Coordinator",
    company: "East Troy Community School District",
    image: "/justin-modrak.webp",
    quote: "Hexnode is of great value. Works great with Android and iOS!",
  },
  {
    name: "Jane Doe",
    role: "IT Manager",
    company: "TechCorp Solutions",
    image: "/chris-robinson.webp",
    quote:
      "Most complete MDM solution I found, and I tested many of them, including major names",
  },
  {
    name: "Chris Robinson",
    role: "IT Manager",
    company: "TechCorp Solutions",
    image: "/dalibor-kruljac.webp",
    quote: "It seemed to be in-line with everything we were looking at.",
  },
];

const brands = [
  "/brands/b1.svg",
  "/brands/b2.webp",
  "/brands/b3.svg",
  "/brands/b4.svg",
  "/brands/b5.svg",
  "/brands/b6.svg",
  "/brands/b7.svg",
  "/brands/b8.svg",
  "/brands/b9.svg",
];

export default function SwiperSlider() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-5">
      {/* Testimonials Swiper */}
      <div className="w-full max-w-3xl mx-auto bg-white text-black relative mb-10">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={70}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="rounded-lg shadow-lg"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center h-64"
            >
              <div className="flex flex-col md:flex-row overflow-hidden rounded-lg bg-white p-5 shadow-md">
                <img
                  alt={testimonial.name}
                  src={testimonial.image}
                  className="w-40 h-40 object-cover rounded-full"
                />
                <div className="ml-5">
                  <h4 className="text-xl font-bold">"{testimonial.quote}"</h4>
                  <p className="text-sm font-semibold mt-2">
                    {testimonial.name}
                  </p>
                  <small className="text-gray-600">
                    {testimonial.role}, {testimonial.company}
                  </small>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Brands Swiper */}
      <div className="w-full max-w-4xl">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20} // Reduced gap
          slidesPerView={3}
          autoplay={{ delay: 2000 }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          className="flex items-center"
        >
          {brands.map((brand, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <img
                src={brand}
                alt={`Brand ${index + 1}`}
                className="w-32 h-20 object-contain"
              />{" "}
              {/* Increased size */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
