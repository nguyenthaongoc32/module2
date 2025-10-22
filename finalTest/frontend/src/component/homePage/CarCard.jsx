import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCarSide } from "react-icons/fa";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { GiCarDoor } from "react-icons/gi";
import { IoSnowOutline } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const { _id, make, model, category, transmission, features, price_per_day, images } = car;

  return (
    <div
      className="shadow-lg rounded-xl  bg-white cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => navigate(`/getCar/${_id}`)}
    >
      {/* Ảnh xe */}
      <div className=" bg-black ">
        <img
          src={images && images.length > 0 ? images[0] : "/placeholder.jpg"}
          alt={model}
          className="w-50 h-50 overflow-hidden"
        />
      </div>

      {/* Nội dung */}
      <div className="p-4">
        {/* Category */}
        <p className="text-lg font-semibold text-red-500 uppercase">{category || "ECONOMY"}</p>

        {/* Make + Model */}
        <h2 className="text-2xl font-bold">{make} {model}</h2>

        {/* Giá */}
        <p className="text-gray-700 font-semibold text-xl mt-1">
          {price_per_day?.amount?.toLocaleString("vi-VN")} {price_per_day?.currency || "VND"}
        </p>

        {/* Thông tin chi tiết */}
        <div className="flex flex-wrap gap-2 mt-3 text-gray-600 text-xl">
          <div className="flex items-center gap-1">
            <MdAirlineSeatReclineNormal size={35} className="text-red-500 " />
            {features?.seats} seats
          </div>
          <div className="flex items-center gap-1 ml-6">
            <GiCarDoor size={35} className="text-red-500" />
            {features?.doors} doors
          </div>
          <div className="flex items-center gap-1">
            <MdOutlineSettings size={35} className="text-red-500" />
            {transmission}
          </div>
          <div className="flex items-center gap-1">
            <IoSnowOutline size={35} className="text-red-500" />
            {features?.ac ? "YES" : "NO"}
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium shadow">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
