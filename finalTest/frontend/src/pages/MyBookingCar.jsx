import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { Responsive } from "../component/Reponsive.js";
const MyBookingCar = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/booking/getMyBookings",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.ok) setBookings(res.data.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchBookings();
  }, [token]);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await axios.put(
        `http://localhost:8080/api/booking/cancle/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: "cancelled" } : b))
      );
      toast.success("Order cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Cancellation failed!");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-8 min-h-[600px]" responsive={Responsive}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#E50914] pb-2">
        My Booking Cars
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not placed any orders yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((b) => {
            const car = b.carId;
            const startDate = moment(b.pickup_date).format("DD/MM/YYYY");
            const endDate = moment(b.return_date).format("DD/MM/YYYY");

            return (
              <div
                key={b._id}
                className="border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-lg transition"
              >
                <img
                  src={car?.images?.[0] || "/default-car.jpg"}
                  alt={`${car?.make} ${car?.model}`}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {car?.make} {car?.model}
                </h3>
                <p className="text-sm text-gray-500">
                  {startDate} → {endDate}
                </p>
                <p className="mt-1 text-sm text-gray-700">Days: {b.days}</p>
                <p className="text-sm text-gray-700">
                  Total:{" "}
                  <span className="font-semibold text-green-700">
                    ${b.total_price}
                  </span>
                </p>
                <p className="text-sm text-gray-700">
                  Deposit: ${b.deposit || 0}
                </p>
                <p
                  className={`mt-2 text-sm font-semibold ${
                    b.status === "reserved"
                      ? "text-blue-600"
                      : b.status === "completed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {b.status}
                </p>

                {b.status === "reserved" && (
                  <button
                    onClick={() => handleCancel(b._id)}
                    className="mt-3 px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    Cancel order
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookingCar;
