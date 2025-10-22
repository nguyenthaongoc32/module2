import React from "react";

const WhyChooseUs = () => {
  return (
    <div className="px-40 lg:px-40 py-16 ">
      {/* Title */}
      <h1 className="text-5xl font-bold mb-8">
        Why choose <span className="text-red-500">us</span>
      </h1>

      {/* Image */}
      <div className="flex justify-center mb-8">
        <img
          src="/about-img.jpg"
          alt="Car Rental Service"
          className="w-full max-w-10xl rounded-lg shadow-md"
        />
      </div>

      {/* Text dưới ảnh */}
      <div className="space-y-7 text-gray-800 leading-relaxed max-w-10xl mx-auto text-justify text-2xl font-semibold">
        <p>
          Welcome to the world of unforgettable journeys across Vietnam{" "}
          <span className="text-red-500 font-semibold">
            with our car rental service!
          </span>
        </p>

        <p>
          Explore the beauty of this amazing country in a convenient and
          comfortable car. Our cars provide independence and the freedom to
          move, allowing you to savor every moment of your journey. Whether
          you're planning to visit the coastline along Ha Long Bay, the stunning
          rice terraces of Sapa.
        </p>

        <p>
          <span className="text-red-500 font-semibold">
            DriveNow – your reliable partner in car rental services in Vietnam!
          </span>{" "}
          We offer a wide range of rental cars in Nha Trang and other regions of
          the country. Our service provides customers with convenience and
          safety, offering modern and reliable cars at competitive prices.
        </p>

        <p>
          We take pride in our high level of service and strive to provide
          customers with an unforgettable travel experience. Our team of
          professionals is always ready to help you choose the perfect car for
          your needs and provide support throughout the rental period.
        </p>

        <p>
          Don’t miss the opportunity to enjoy freedom and convenience during
          your journey in Vietnam with DriveNow. Make your choice today and start
          your unforgettable road adventure!
        </p>
      </div>
    </div>
  );
};

export default WhyChooseUs;
