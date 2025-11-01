import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import { Responsive } from "../component/Reponsive.js";
const BookingManage = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");
  const API = "http://localhost:8080/admin";

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API}/getBooking`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `${API}/booking/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? res.data.data : b))
      );
      toast.success("Status updated");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  const delBooking = async (id) => {
    if (!confirm("Delete this order?")) return;
    try {
      await axios.delete(`${API}/booking/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prev) => prev.filter((b) => b._id !== id));
      toast.success("Order deleted");
    } catch (err) {
      console.error(err);
      toast.error("Delete failure");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100" responsive={Responsive}>
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Booking</h2>
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white p-4 rounded shadow flex items-center gap-4"
            >
              <img
                src={b.carId?.images?.[0] || "/default-car.jpg"}
                className="w-32 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <div className="font-semibold">
                  {b.carId?.make} {b.carId?.model}
                </div>
                <div className="text-sm text-gray-600">
                  {b.customer?.firstName} {b.customer?.lastName} •{" "}
                  {b.customer?.email}
                </div>
                <div className="text-sm">
                  Total ${b.total_price} •{" "}
                  <strong
                    className={
                      b.status === "completed"
                        ? "text-green-600"
                        : b.status === "cancelled"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }
                  >
                    {b.status}
                  </strong>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => updateStatus(b._id, "completed")}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                 Completed
                </button>
                <button
                  onClick={() => updateStatus(b._id, "cancelled")}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Reserved
                </button>
                <button
                  onClick={() => delBooking(b._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BookingManage;
