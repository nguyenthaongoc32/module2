import React from "react";
import { Responsive } from "../Reponsive.js";
const ContactUs = () => {
  return (
    <div className="bg-red-500 text-white px-6 lg:px-32 py-16" responsive={Responsive}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left side: CTA text */}
        <div className="lg:col-span-5">
          <h2 className="text-5xl font-bold leading-tight mb-4">
            Start your car <br /> rental adventure <br /> today!
          </h2>
          <p className="text-2xl text-gray-100">
            Ready to embark on an unforgettable journey through the captivating
            landscapes of Vietnam? Let us make your car rental experience
            seamless and enjoyable.
          </p>
        </div>

        {/* Right side: Form */}
        <div className="lg:col-span-7 space-y-6 relative -mt-15 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-2xl">Name</label>
              <input
                type="text"
                placeholder="Please enter"
                className="w-full bg-transparent border-b border-white placeholder-gray-300 focus:outline-none focus:border-gray-200 py-2 text-2xl"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-2xl">Email</label>
              <input
                type="email"
                placeholder="Please enter"
                className="w-full bg-transparent border-b border-white placeholder-gray-300 focus:outline-none focus:border-gray-200 py-2 text-2xl"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-2xl">Phone number</label>
            <input
              type="text"
              placeholder="Please enter"
              className="w-full bg-transparent border-b border-white placeholder-gray-300 focus:outline-none focus:border-gray-200 py-2 text-2xl"
            />
          </div>

          {/* Button */}
          <button className="bg-gray-800 text-white px-10 py-5 font-bold rounded shadow hover:bg-gray-700 transition">
            CONTACT ME
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
