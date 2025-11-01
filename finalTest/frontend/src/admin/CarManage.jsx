import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import { Responsive } from "../component/Reponsive.js";
const CarManage = () => {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");
  const API = "http://localhost:8080/admin";

  const fetchCars = async () => {
    try {
      const res = await axios.get(`${API}/getCars`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars(res.data.data);
    } catch (err) {
      console.error("Error fetching cars:", err);
      toast.error("Unable to load vehicle list!");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleSave = async () => {
    if (!editing) return;
    try {
      const res = await axios.put(`${API}/putCar/${editing}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars((prev) =>
        prev.map((c) => (c._id === editing ? res.data.data : c))
      );
      setEditing(null);
      setForm(null);
      setShowModal(false);
      toast.success("Vehicle update successful!");
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Update failed!");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this car?")) return;
    try {
      await axios.delete(`${API}/deleteCar/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars((prev) => prev.filter((c) => c._id !== id));
      toast.success("Vehicle deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed!");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100" responsive={Responsive}>
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Car Management</h2>

        {/* Danh sách xe */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-white p-4 rounded shadow flex gap-4 items-center"
            >
              <img
                src={car.images?.[0] || "/default-car.jpg"}
                alt=""
                className="w-32 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <div className="font-semibold">
                  {car.make} {car.model}
                </div>
                <div className="text-sm text-gray-600">
                  {car.category} • {car.transmission}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setEditing(car._id);
                    setForm(car);
                    setShowModal(true);
                  }}
                  className="bg-yellow-400 px-3 py-1 rounded text-sm"
                >
                  Fix
                </button>
                <button
                  onClick={() => handleDelete(car._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal sửa xe */}
        {showModal && form && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
              <h3 className="text-xl font-semibold mb-4">Vehicle Modification </h3>

              <div className="grid grid-cols-1 gap-3">
                <input
                  placeholder="Make"
                  value={form.make}
                  onChange={(e) => setForm({ ...form, make: e.target.value })}
                  className="border p-2 rounded"
                />
                <input
                  placeholder="Model"
                  value={form.model}
                  onChange={(e) => setForm({ ...form, model: e.target.value })}
                  className="border p-2 rounded"
                />
                <input
                  placeholder="Category"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <input
                  placeholder="Transmission"
                  value={form.transmission}
                  onChange={(e) =>
                    setForm({ ...form, transmission: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <input
                  placeholder="Price"
                  type="number"
                  value={form.price_per_day?.amount || 0}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      price_per_day: {
                        ...form.price_per_day,
                        amount: Number(e.target.value),
                      },
                    })
                  }
                  className="border p-2 rounded"
                />
                <input
                  placeholder="Deposit"
                  type="number"
                  value={form.deposit}
                  onChange={(e) =>
                    setForm({ ...form, deposit: Number(e.target.value) })
                  }
                  className="border p-2 rounded"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditing(null);
                    setForm(null);
                  }}
                  className="border px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CarManage;
