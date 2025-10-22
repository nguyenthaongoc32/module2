import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../component/Header";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { GiCarDoor } from "react-icons/gi";
import { IoSnowOutline } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";

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

  // 🧩 Nếu không có car (refresh trang) → lấy carId từ localStorage hoặc chuyển hướng
  useEffect(() => {
    if (car) return;

    const savedCar = localStorage.getItem("selectedCar");
    if (savedCar) {
      setCar(JSON.parse(savedCar));
    } else {
      navigate("/"); // Không có dữ liệu → quay về trang chủ
    }
  }, [car, navigate]);

  // 💾 Lưu car vào localStorage (phòng khi refresh)
  useEffect(() => {
    if (car) {
      localStorage.setItem("selectedCar", JSON.stringify(car));
    }
  }, [car]);

  // 🧮 Gọi API tính giá
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

  // 🧾 Gửi yêu cầu đặt xe
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!car) {
      alert("Không tìm thấy thông tin xe!");
      return;
    }

    try {
      // 1️⃣ Tạo booking
      const bookingRes = await axios.post("http://localhost:8080/api/booking/createBooking", {
        carId: car._id,
        customer: user?._id,
        pickup_date: pickupDate,
        return_date: returnDate,
        pickup_time: pickupTime,
        return_time: returnTime,
        paymentOption,
        subOption,
      });

      if (!bookingRes.data.ok || !bookingRes.data.data) {
        alert("Đặt xe thất bại: " + (bookingRes.data.error || "Unknown error"));
        return;
      }

      const bookingId = bookingRes.data.data._id;

      // 2️⃣ Thanh toán Momo (nếu có)
      if (subOption === "Momo") {
        if (!bookingData) {
          alert("Vui lòng đợi hệ thống tính giá xong trước khi thanh toán!");
          return;
        }

        let payAmount = 0;
        if (paymentOption === "traSau") {
          payAmount = bookingData?.deposit;
        } else if (paymentOption === "traTruoc") {
          payAmount = Math.round(bookingData?.total_price * 0.95);
        }

        // Chuyển USD sang VND nếu cần
        if (car.price_per_day.currency === "$" || car.price_per_day.currency === "USD") {
          payAmount = Math.round(payAmount * 25000);
        }

        const momoRes = await axios.post("http://localhost:8080/api/momo/createPayment", {
          amount: payAmount,
          orderInfo:
            paymentOption === "traSau"
              ? `Đặt cọc thuê xe ${car.make} ${car.model}`
              : `Thanh toán thuê xe ${car.make} ${car.model}`,
          userId: user?._id,
          carId: car._id,
          bookingId,
          paymentOption,
        });

        if (momoRes.data?.payUrl) {
          window.location.href = momoRes.data.payUrl;
        } else {
          alert("Không tạo được liên kết thanh toán Momo!");
        }
        return;
      }

      // 3️⃣ Nếu không dùng Momo
      alert("Đặt xe thành công!");
      navigate("/");

    } catch (err) {
      console.error("Booking/Payment error:", err);
      alert("Lỗi server, vui lòng thử lại.");
    }
  };

  // ⚠️ Nếu chưa có car thì hiển thị thông báo
  if (!car) {
    return (
      <div className="p-10 text-center text-red-600 text-xl font-bold">
        ❌ Không tìm thấy thông tin xe. Vui lòng quay lại và chọn xe.
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex justify-center p-6">
        <div className="grid grid-cols-3 gap-6 bg-gray-50 p-6 rounded-lg shadow max-w-5xl w-full">
          {/* LEFT - Thông tin xe */}
          <div className="col-span-1 space-y-4">
            <div className="bg-white shadow rounded p-4">
              <img
                src={car.images?.[0] || "/placeholder.jpg"}
                alt={`${car.make || ""} ${car.model || ""}`}
                className="h-40 w-full object-cover rounded"
              />
              <h1 className="text-3xl font-bold text-red-500 font-mono text-center">
                {car.make} {car.model}
              </h1>
              <p className="text-xl font-bold font-serif text-center">
                {car.category}
              </p>

              <div className="flex flex-wrap gap-2 mt-6 text-gray-600 text-xs">
                <p className="flex items-center gap-2">
                  <MdAirlineSeatReclineNormal size={28} className="text-red-500" />
                  {car.features?.seats} seats
                </p>
                <p className="flex items-center gap-2">
                  <GiCarDoor size={28} className="text-red-500" />
                  {car.features?.doors} doors
                </p>
                <p className="flex items-center gap-2">
                  <IoSnowOutline size={28} className="text-red-500" />
                  {car.features?.ac ? "YES" : "NO"}
                </p>
                <p className="flex items-center gap-2">
                  <MdOutlineSettings size={28} className="text-red-500" />
                  {car.transmission}
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
                <h2 className="font-bold text-lg mb-2 border-b pb-2">
                  PRICE DETAILS
                </h2>
                <div className="flex justify-between">
                  <span>Unit price</span>
                  <span>
                    {bookingData.pricePerDay?.toLocaleString()} {car.price_per_day.currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Rental period</span>
                  <span>
                    × {bookingData.days} day {bookingData.hours > 0 && `${bookingData.hours}h`}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Basic price</span>
                  <span>
                    {bookingData.basePrice?.toLocaleString()} {car.price_per_day.currency}
                  </span>
                </div>

                {paymentOption === "traTruoc" && (
                  <div className="flex justify-between text-green-600">
                    <span>Prepay (-5%)</span>
                    <span>
                      -{Math.round(bookingData.basePrice * 0.05).toLocaleString()} {car.price_per_day.currency}
                    </span>
                  </div>
                )}

                <div className="font-bold mt-2">Total price</div>
                <div className="flex justify-between">
                  <span>VAT (+8%)</span>
                  <span>
                    {bookingData.vat?.toLocaleString()} {car.price_per_day.currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>
                    {bookingData.total_price?.toLocaleString()} {car.price_per_day.currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Deposit</span>
                  <span>
                    {bookingData.deposit?.toLocaleString()} {car.price_per_day.currency}
                  </span>
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
