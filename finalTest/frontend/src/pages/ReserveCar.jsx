import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation,Link  } from "react-router-dom";
import axios from "axios";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { GiCarDoor } from "react-icons/gi";
import { IoSnowOutline } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import Footer from "../component/footer";
import Header from "../component/Header";

const ReserveCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [car, setCar] = useState(null);
  const [pickupDate, setPickupDate] = useState(location.state?.pickup_date || "");
  const [returnDate, setReturnDate] = useState(location.state?.return_date || "");
  const [pickupTime, setPickupTime] = useState(location.state?.pickup_time || "00:00");
  const [returnTime, setReturnTime] = useState(location.state?.return_time || "00:00");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/car/getCar/${id}`);
        if (res.data.success) {
          setCar(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching car details", err);
      }
    };
    fetchCar();
  }, [id]);

  if (!car) return <p>Loading...</p>;

  // Tính số giờ và số ngày thuê
  const calcTime = () => {
    if (!pickupDate || !returnDate) return { days: 1, hours: 0 };


    const start = new Date(`${pickupDate}T${pickupTime}`);
    const end = new Date(`${returnDate}T${returnTime}`);
    const diffMs = end - start;

    if (diffMs <= 0) return { days: 1, hours: 0 };

    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffHours / 24);
    const hours = diffHours % 24;

    return { days, hours };


  };

  const { days, hours } = calcTime();
  const pricePerDay = car.price_per_day?.amount || 0;

  // Tính giá: ngày + giờ 
  const basePrice = days * pricePerDay + (hours * pricePerDay) / 24;
  const vat = basePrice * 0.08;
  const total = basePrice + vat;
  const deposit = car.deposit || Math.floor(basePrice * 0.3);

  return (
    <>
    <Header/>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-20">
 <div className="col-span-2 bg-white shadow rounded p-6">
  <div className="flex flex-col md:flex-row gap-6">
      <img
        src={car.images && car.images.length > 0 ? car.images[0] : "/placeholder.jpg"}
        alt={`${car.make || ""} ${car.model || ""}`}
        className="h-64 object-cover rounded"
      /> 
      <div className="flex-1">
      <h1 className="text-4xl font-bold  text-red-500 font-mono">
        {car.make} {car.model} 
      </h1> 
      <p className="text-2xl font-bold font-serif ">{car.category}</p>
      <p className="text-yellow-500 text-2xl">★★★★☆ (4.0)</p>

      {/* Thông tin cơ bản */}
      <div className="flex flex-wrap gap-4 mt-3 text-gray-600 text-lg">
        <p className="flex items-center gap-4">  
        <MdAirlineSeatReclineNormal size={28} className="text-red-500" />
                {car.features?.seats} seats
        </p>
        <p className="flex items-center gap-4">
          <GiCarDoor size={28} className="text-red-500" />
                {car.features?.doors} doors 
                </p>
        <p className="flex items-center gap-4">  
          <IoSnowOutline size={28} className="text-red-500" />
                {car.features?.ac ? "YES" : "NO"}
        </p>
        <p className="flex items-center gap-4">
          <MdOutlineSettings size={28} className="text-red-500" />
                {car.transmission}</p>
        {car.generation && <p>📌 Generation : {car.generation}</p>}
      </div>
      </div>
      </div>
      {/* Mô tả */}
      {car.description && (
        <>
          <h2 className="mt-6 font-bold text-lg">Description</h2>
          <p>{car.description}</p>
        </>
      )}

      {/* Thủ tục */}
      <h2 className="mt-6 font-bold text-lg">Procedures</h2>
      <ul className="list-disc ml-6">
        {car.documents?.verification?.map((doc, i) => <li key={i}>{doc}</li>)}
        {car.documents?.mortgage?.map((doc, i) => <li key={i}>{doc}</li>)}
        {car.documents?.assets?.map((asset, i) => <li key={i}>{asset}</li>)}
      </ul>

      {/* Thanh toán */}
      <h2 className="mt-6 font-bold text-lg">Accept payments</h2>
      <ul className="list-disc ml-6">
        {car.payment?.map((p, i) => <li key={i}>{p}</li>)}
      </ul>

      {/* Giới hạn */}
      <h2 className="mt-6 font-bold text-lg">Distance limit</h2>
      <p>Maximum {car.limit?.distancePerDay || 0} km/day</p>
      <p>Extra {car.limit?.extraFee?.toLocaleString() || 0} $/km</p>
    </div>

 {/* RIGHT */}
<div className="col-span-1 space-y-6">
  <div className="bg-white shadow rounded p-4">
    <h2 className="font-bold text-lg mb-2 border-b pb-2 ">RENTAL PERIOD</h2>
    <div className="grid grid-cols-2 gap-2">
      <div>
        <label className="block text-sm text-gray-600 mb-1">Car pick-up date</label>
        <input
          type="datetime-local"
          value={`${pickupDate}T${pickupTime}`}
          onChange={(e) => {
            const [date, time] = e.target.value.split("T");
            setPickupDate(date);
            setPickupTime(time);
          }}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Car return date</label>
        <input
          type="datetime-local"
          value={`${returnDate}T${returnTime}`}
          onChange={(e) => {
            const [date, time] = e.target.value.split("T");
            setReturnDate(date);
            setReturnTime(time);
          }}
          className="w-full border p-2 rounded"
        />
      </div>
    </div>
  </div>
  <div className="bg-white shadow rounded p-4">
    <h2 className="font-bold text-lg mb-2 border-b pb-2">PRICE DETAILS</h2>
    <div className="space-y-2 text-gray-700">
      <div className="flex justify-between">
        <span>Unit price</span>
        <span>{pricePerDay.toLocaleString()} {car.price_per_day?.currency || "$"}</span>
      </div>
      <div className="flex justify-between">
        <span>Rental period</span>
        <span>× {days} day {hours > 0 && `${hours} giờ`}</span>
      </div>
      <div className="flex justify-between border-b pb-2">
        <span>Basic price</span>
        <span>{(pricePerDay * days).toLocaleString()} {car.price_per_day?.currency || "$"}</span>
      </div>

      <div className="font-bold">Total price</div>
      <div className="flex justify-between">
        <span>VAT (+8%)</span>
        <span>{vat.toLocaleString()} {car.price_per_day?.currency || "$"}</span>
      </div>
      <div className="flex justify-between">
        <span>Total</span>
        <span>{total.toLocaleString()} {car.price_per_day?.currency || "$"}</span>
      </div>
      <div className="flex justify-between">
        <span>Deposit</span>
        <span>{deposit.toLocaleString()} {car.price_per_day?.currency || "$"}</span>
      </div>
    </div>
  </div>

  {/* Box 3 - Buttons */}
  <div className="space-y-2">
    <button  className="w-full bg-red-500 hover:bg-teal-500 text-white py-2 rounded"
    onClick={() =>
      navigate("/booking", {
        state: {
          car,
          pickupDate,
          pickupTime,
          returnDate,
          returnTime,
          days,
          hours,
          total,
          deposit,
          vat,
        },
      })
    }
    >
    Book
    </button>
    <button
      onClick={() => navigate(-1)}
      className="w-full bg-gray-200 py-2 rounded"
    >
     Back
    </button>
  </div>
</div>

  </div>
  <Footer/>
</>
  );
};

export default ReserveCar;
