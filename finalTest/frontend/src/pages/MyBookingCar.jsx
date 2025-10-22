import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const MyBookingCar = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/booking/getMyBookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.ok) {
          setBookings(res.data.data);
        } else {
          console.error(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchBookings();
  }, [token]);

  // 🟥 Hủy đơn
  const handleCancel = async (id) => {
    if (!window.confirm("Bạn có chắc muốn hủy đơn này không?")) return;
    try {
      await axios.put(
        `http://localhost:8080/api/booking/cancle/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: "cancelled" } : b))
      );
      alert("Đã hủy đơn thành công!");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Hủy đơn thất bại!");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Đang tải...</p>;
  if (bookings.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500">
        Bạn chưa có đơn đặt xe nào.
      </p>
    );

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((b) => {
        const car = b.carId;
        const startDate = moment(b.pickup_date).format("DD/MM/YYYY");
        const endDate = moment(b.return_date).format("DD/MM/YYYY");

        return (
          <div
            key={b._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 transition hover:shadow-lg"
          >
            <img
              src={car?.images?.[0] || "/default-car.jpg"}
              alt={`${car?.make} ${car?.model}`}
              className="w-full h-40 object-cover rounded-xl mb-3"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              {car?.make} {car?.model}
            </h2>
            <p className="text-sm text-gray-500">
              {startDate} → {endDate}
            </p>
            <p className="mt-2 text-sm text-gray-700">Số ngày: {b.days}</p>
            <p className="text-sm text-gray-700">
              Tổng tiền:{" "}
              <span className="font-semibold text-green-700">
                ${b.total_price}
              </span>
            </p>
            <p className="text-sm text-gray-700">Cọc: ${b.deposit || 0}</p>
            <p
              className={`mt-2 text-sm font-semibold ${
                b.status === "reserved"
                  ? "text-blue-600"
                  : b.status === "completed"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              Trạng thái: {b.status}
            </p>

            {b.status === "reserved" && (
              <button
                onClick={() => handleCancel(b._id)}
                className="mt-3 px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Hủy đơn
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MyBookingCar;
