import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { GiCarDoor } from "react-icons/gi";
import { IoSnowOutline } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import Header from "../component/Header";
import Footer from "../component/footer";
import { Responsive } from "../component/Reponsive.js";
const CarSearch = () => {
  const location = useLocation();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const url = `http://localhost:8080/api/booking/searchCar${location.search}`;
        console.log("Fetching:", url);
        const res = await axios.get(url);
        console.log("Response:", res.data);
        if (res.data.ok) {
          setCars(res.data.data); // ✅ correct
        } else {
          setCars([]);
        }
      } catch (err) {
        console.error("Error fetching cars", err.response?.data || err.message);
        setCars([]);
      }
    };
    

    fetchCars();
  }, [location.search]);


  return (
    <> 
    <Header/>
      <p className="text-7xl text-gray-500 font-bold ml-20 mt-20" >Your
        <span className="text-red-500"> Options</span>
      </p>
      <span className="text-2xl text-gray-500 ml-24">for selected period </span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ml-20 mt-10 mr-20" responsive={Responsive}>
        {cars.map((car) => (
          <div key={car._id} className="border rounded-lg p-4 shadow">
            <img
              src={car.images?.[0] || "/placeholder.jpg"}
              alt={car.model}
              className="w-full h-50 object-cover rounded"
            />
            <p className=" text-xl mt-3 text-red-500 font-mono font-bold">{car.category}</p>
            <h2 className="text-2xl font-bold mt-3 ">
              {car.make} {car.model}
            </h2>
            <p className=" font-bold text-xl mt-3">
              {car.price_per_day.amount} {car.price_per_day.currency} / day
            </p>

            {/* Features section */}
            <div className="flex flex-wrap gap-8 mt-3 text-gray-600 text-xl ">
              <div className="flex items-center gap-4">
                <MdAirlineSeatReclineNormal size={28} className="text-red-500" />
                {car.features?.seats} seats
              </div>
              <div className="flex items-center gap-4">
                <GiCarDoor size={28} className="text-red-500" />
                {car.features?.doors} doors
              </div>
              <div className="flex items-center gap-4">
                <MdOutlineSettings size={28} className="text-red-500" />
                {car.transmission}
              </div>
              <div className="flex items-center gap-4">
                <IoSnowOutline size={28} className="text-red-500" />
                {car.features?.ac ? "YES" : "NO"}
              </div>
            </div>
            <div className="mt-6 flex justify-center">
            <Link
  to={`/getCar/${car._id}`}
  state={{
    pickup_date: new URLSearchParams(location.search).get("pickup_date"),
    return_date: new URLSearchParams(location.search).get("return_date"),
    pickup_time: new URLSearchParams(location.search).get("pickup_time"),
    return_time: new URLSearchParams(location.search).get("return_time"),
  }}
>
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium shadow">
                Details
              </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </>
  );
};

export default CarSearch;
