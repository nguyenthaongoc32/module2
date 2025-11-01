import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../component/Header";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { GiCarDoor } from "react-icons/gi";
import { IoSnowOutline } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import { toast } from "react-toastify";
import { Responsive } from "../component/Reponsive.js";
const Booking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { car: stateCar, pickupDate, pickupTime, returnDate, returnTime } = state || {};

  const [car, setCar] = useState(stateCar || null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [paymentOption, setPaymentOption] = useState("traSau");
  const [subOption, setSubOption] = useState("Momo");
  const [bookingData, setBookingData] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!car) {
      const savedCar = localStorage.getItem("selectedCar");
      if (savedCar) {
        setCar(JSON.parse(savedCar));
      } else {
        navigate("/");
      }
    }
  }, [car, navigate]);

  // Lưu car vào localStorage
  useEffect(() => {
    if (car) {
      localStorage.setItem("selectedCar", JSON.stringify(car));
    }
  }, [car]);

  // Gọi API tính giá
  useEffect(() => {
    if (!car) return;

    const fetchPrice = async () => {
      try {
        const res = await axios.post("http://localhost:8080/api/booking/calcPrice", {
          carId: car._id,
          pickup_date: pickupDate,
          return_date: returnDate,
          pickup_time: pickupTime,
          return_time: returnTime,
          paymentOption,
          subOption,
        });

        if (res.data.ok) {
          let { days, hours } = res.data.data;
          if (days === 0 && hours > 0) {
            days = 1;
            hours = 0;
          }
          setBookingData({ ...res.data.data, days, hours });
        } else {
          console.error("Price error:", res.data.error);
        }
      } catch (err) {
        console.error("API error", err);
      }
    };

    fetchPrice();
  }, [car, pickupDate, pickupTime, returnDate, returnTime, paymentOption, subOption]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!car) {
      toast.warning("Car information not found!");
      return;
    }

    if (!token) {
      toast.warning("You need to login to book a car!");
      navigate("/login");
      return;
    }

    try {
      // Tạo booking
      const bookingRes = await axios.post(
        "http://localhost:8080/api/booking/createBooking",
        {
          carId: car._id,
          pickup_date: pickupDate,
          return_date: returnDate,
          pickup_time: pickupTime,
          return_time: returnTime,
          paymentOption,
          subOption,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!bookingRes.data.ok || !bookingRes.data.data) {
        toast.error("Booking failed:" + (bookingRes.data.error || "Unknown error"));
        return;
      }

      const bookingId = bookingRes.data.data._id;

      // Thanh toán MoMo
      if (subOption === "Momo") {
        if (!bookingData) {
          toast.warning("Please wait for the system to calculate the price before paying!");
          return;
        }

        let payAmount = 0;
        if (paymentOption === "traSau") {
          payAmount = bookingData?.deposit;
        } else if (paymentOption === "traTruoc") {
          payAmount = Math.round(bookingData?.total_price * 0.95);
        }

        // Chuyển USD sang VND nếu cần
        if (car.price_per_day?.currency === "$" || car.price_per_day?.currency === "USD") {
          payAmount = Math.round(payAmount * 25000);
        }

        const momoRes = await axios.post(
          "http://localhost:8080/api/momo/createPayment",
          {
            amount: payAmount,
            orderInfo:
              paymentOption === "traSau"
                ? `Đặt cọc thuê xe ${car.make} ${car.model}`
                : `Thanh toán thuê xe ${car.make} ${car.model}`,
            userId: user?._id,
            carId: car._id,
            bookingId,
            paymentOption,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (momoRes.data?.payUrl) {
          window.location.href = momoRes.data.payUrl;
        } else {
          toast.error("Unable to create Momo payment link!");
        }
        return;
      }

      toast.success("Booking successful!");
      navigate("/");
    } catch (err) {
      console.error("Booking/Payment error:", err);
      const errorMessage = err.response?.data?.message || "Server error, please try again.";
      if (errorMessage.includes("Xe đã được đặt trong khung thời gian")) {
        toast.warning("🚫 Xe đã được đặt trong thời gian này! Vui lòng chọn khung giờ khác.");
      } else {
        toast.error(errorMessage);
      }
    }
  };

  if (!car) return <p>Loading car information...</p>;

  return (
    <>
      <Header />
      <div className="flex justify-center p-6" responsive={Responsive}>
        <div className="grid grid-cols-3 gap-6 bg-gray-50 p-6 rounded-lg shadow max-w-5xl w-full">
          {/* LEFT - Thông tin xe */}
          <div className="col-span-1 space-y-4">
            <div className="bg-white shadow rounded p-4">
              <img
                src={car?.images?.[0] || "/placeholder.jpg"}
                alt={`${car?.make || ""} ${car?.model || ""}`}
                className="h-40 w-full object-cover rounded"
              />
              <h1 className="text-3xl font-bold text-red-500 font-mono text-center">
                {car?.make || "Car"} {car?.model || ""}
              </h1>
              <p className="text-xl font-bold font-serif text-center">{car?.category || ""}</p>

              <div className="flex flex-wrap gap-2 mt-6 text-gray-600 text-xs">
                <p className="flex items-center gap-2">
                  <MdAirlineSeatReclineNormal size={28} className="text-red-500" />
                  {car?.features?.seats || 0} seats
                </p>
                <p className="flex items-center gap-2">
                  <GiCarDoor size={28} className="text-red-500" />
                  {car?.features?.doors || 0} doors
                </p>
                <p className="flex items-center gap-2">
                  <IoSnowOutline size={28} className="text-red-500" />
                  {car?.features?.ac ? "YES" : "NO"}
                </p>
                <p className="flex items-center gap-2">
                  <MdOutlineSettings size={28} className="text-red-500" />
                  {car?.transmission || ""}
                </p>
              </div>

              <p className="mt-6 font-bold text-lg">DELIVERY</p>
              <p className="text-sm text-gray-600">Pick up at the dealership</p>
              <p className="mt-6 font-bold text-lg">Time:</p>
              <p className="text-sm text-gray-600">
                {pickupDate} {pickupTime} → {returnDate} {returnTime}
              </p>
            </div>

            {/* Chi tiết giá */}
            {bookingData && (
              <div className="bg-white shadow rounded p-4">
                <h2 className="font-bold text-lg mb-2 border-b pb-2">PRICE DETAILS</h2>
                <div className="flex justify-between">
                  <span>Unit price</span>
                  <span>{bookingData.pricePerDay?.toLocaleString() || 0} {car?.price_per_day?.currency || "$"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rental period</span>
                  <span>× {bookingData.days} day {bookingData.hours > 0 && `${bookingData.hours}h`}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Basic price</span>
                  <span>{bookingData.basePrice?.toLocaleString() || 0} {car?.price_per_day?.currency || "$"}</span>
                </div>

                {paymentOption === "traTruoc" && (
                  <div className="flex justify-between text-green-600">
                    <span>Prepay (-5%)</span>
                    <span>-{Math.round(bookingData.basePrice * 0.05).toLocaleString()} {car?.price_per_day?.currency || "$"}</span>
                  </div>
                )}

                <div className="font-bold mt-2">Total price</div>
                <div className="flex justify-between">
                  <span>VAT (+8%)</span>
                  <span>{bookingData.vat?.toLocaleString() || 0} {car?.price_per_day?.currency || "$"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>{bookingData.total_price?.toLocaleString() || 0} {car?.price_per_day?.currency || "$"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deposit</span>
                  <span>{bookingData.deposit?.toLocaleString() || 0} {car?.price_per_day?.currency || "$"}</span>
                </div>
              </div>
            )}
          </div>

 



          {/* RIGHT - Thông tin khách hàng */}
          <div className="col-span-2 bg-white shadow rounded p-6">
            <h2 className="font-bold text-xl mb-4">CUSTOMER INFORMATION</h2>
            <p className="text-gray-500 font-medium">
              Enter personal information to proceed with booking
            </p>

            <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
              <div>
                <label>
                  Full name (<span className="text-red-500">*</span>)
                </label>
                <input
                  className="w-full border p-2 rounded"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>
                  Phone (<span className="text-red-500">*</span>)
                </label>
                <input
                  className="w-full border p-2 rounded"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>
                  Email (<span className="text-red-500">*</span>)
                </label>
                <input
                  type="email"
                  className="w-full border p-2 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Note</label>
                <textarea className="w-full border p-2 rounded" />
              </div>

              {/* Hình thức thanh toán */}
              <h3 className="font-bold mt-4 text-lg">
                Payment method (<span className="text-red-500">*</span>)
              </h3>

              {/* Các lựa chọn thanh toán */}
              <div className="space-y-4">
                {/* Trả trước */}
                <div
                  className={`border rounded p-4 cursor-pointer transition ${
                    paymentOption === "traTruoc"
                      ? "border-teal-500 bg-teal-50"
                      : "hover:bg-gray-50 hover:border-teal-500"
                  }`}
                  onClick={() => setPaymentOption("traTruoc")}
                >
                  <label className="flex items-start gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="traTruoc"
                      checked={paymentOption === "traTruoc"}
                      onChange={() => setPaymentOption("traTruoc")}
                    />
                    <div>
                      <div className="font-bold text-lg">Prepay</div>
                      <p className="mt-3 text-base text-gray-600">
                        Pay 100% of the invoice <br />
                        <span className="text-green-600">5% discount on car rental</span>
                      </p>
                    </div>
                  </label>

                  {paymentOption === "traTruoc" && (
                    <div className="ml-6 mt-3 space-y-2">
                      {["Momo", "VISA", "VNPAY", "BANK"].map((opt) => (
                        <label key={opt} className="flex gap-2">
                          <input
                            type="radio"
                            name="subOption"
                            value={opt}
                            checked={subOption === opt}
                            onChange={() => setSubOption(opt)}
                          />
                          {opt === "VISA"
                            ? "VISA/Master Card (Card issued in Vietnam)"
                            : opt === "BANK"
                            ? "Bank transfer"
                            : opt}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Trả sau */}
                <div
                  className={`border rounded p-4 cursor-pointer transition ${
                    paymentOption === "traSau"
                      ? "border-teal-500 bg-teal-50"
                      : "hover:bg-gray-50 hover:border-teal-500"
                  }`}
                  onClick={() => setPaymentOption("traSau")}
                >
                  <label className="flex items-start gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="traSau"
                      checked={paymentOption === "traSau"}
                      onChange={() => setPaymentOption("traSau")}
                    />
                    <div>
                      <div className="font-bold text-lg">Pay later</div>
                      <p className="mt-3 text-base text-gray-600">
                        Deposit to hold the car:
                        <span className="text-green-600"> 30% of rental price</span>
                      </p>
                    </div>
                  </label>

                  {paymentOption === "traSau" && (
                    <div className="ml-6 mt-3 space-y-2">
                      {["Momo", "VISA", "VNPAY", "BANK", "payLater"].map((opt) => (
                        <label key={opt} className="flex gap-2">
                          <input
                            type="radio"
                            name="subOption"
                            value={opt}
                            checked={subOption === opt}
                            onChange={() => setSubOption(opt)}
                          />
                          {opt === "VISA"
                            ? "VISA/Master Card (Card issued in Vietnam)"
                            : opt === "BANK"
                            ? "Bank transfer"
                            : opt === "payLater"
                            ? "Pay later"
                            : opt}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button type="submit" className="bg-teal-500 text-white px-6 py-2 rounded">
                  Complete booking
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="bg-gray-200 px-6 py-2 rounded"
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
