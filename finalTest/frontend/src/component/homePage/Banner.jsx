import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import PickupLocationSelect from './LocationSelect';
import { Responsive } from "../Reponsive.js";
const Banner = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnTime, setReturnTime] = useState("");


  const navigate = useNavigate();
  const handleSearch = () => {
    const query = new URLSearchParams({
      pickup_location: pickupLocation,
      pickup_date: pickupDate,
      return_date: returnDate,
      pickup_time: pickupTime,
      return_time: returnTime,
    }).toString();

    navigate(`/search-results?${query}`);
  };
  return (
    <div className="relative w-full bg-white "  responsive={Responsive}>
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-x-12 px-8 md:px-20 py-12">
        {/* Left Content */}
        <div className="max-w-lg z-20">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Car Rental – Search <br /> Compare & Save
          </h1>
          <div className="flex flex-col gap-2 mt-4 text-base">
            <span>✔ No Hidden Costs</span>
            <span>✔ 24/7 Support</span>
            <span>✔ Free Cancellation</span>
          </div>
        </div>
        {/* Right Image */}
        <div className="relative w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
          <img
            src="/banner.png"
            alt="banner"
            className="w-[100%] md:w-[750px] object-contain z-10"
          />
          <img
            src="/backgroung.png"
            alt="banner"
            className="absolute bottom-[-140px] right-[110px] w-[120%] md:w-[850px] object-contain z-20"
          />

        </div>
      </div>

      {/* Bottom Search Section */}
      <div className="bg-red-600 shadow-md rounded-lg p-20 ">
        {/* Tabs */}
        <div className="flex gap-8 items-center border-b-2 border-gray-200 pb-3 mb-10 mt-10 ml-20">
          {/* Title */}
          <button className="text-4xl font-bold text-white tracking-wide">
            Car Rental
          </button>

          {/* Radio Options */}

        </div>
        {/* Search form */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-end ml-1 ">
          {/* Location */}
          <div className="col-span-1">
            <label className="block text-base font-medium text-gray-700 mb-1">
              Pickup Location
            </label>
            <PickupLocationSelect onChange={(loc) => setPickupLocation(loc)} />

          </div>
          {/* Start Date */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full p-2 border rounded" />
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-basefont-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full p-2 border rounded" />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full p-2 border rounded" />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="time"
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
              className="w-full p-2 border rounded" />
          </div>

          {/* Button */}
          <div className="md:col-span-6 flex justify-end">
            <button
              onClick={handleSearch}
              className="bg-black hover:bg-orange-600 text-white px-6 py-2 rounded flex items-center gap-2">

              <i className="fa-solid fa-magnifying-glass"></i>CHECK OPTIONS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner
