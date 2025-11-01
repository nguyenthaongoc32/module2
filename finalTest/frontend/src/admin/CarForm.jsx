import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Responsive } from "../component/Reponsive.js";
const emptyCar = {
  make: "",
  model: "",
  generation: "",
  category: "",
  transmission: "",
  features: { seats: 4, doors: 4, ac: true },
  documents: { verification: [], mortgage: [], assets: [] },
  payment: [],
  price_per_day: { amount: 0, currency: "$" },
  deposit: 0,
  images: [],
  description: "",
  limit: { distancePerDay: 0, extraFee: 0 },
  status: "available",
  available_from: "",
  available_start_time: "",
  available_end_time: "",
};

const CarForm = () => {
  const [form, setForm] = useState(emptyCar);
  const [imageFiles, setImageFiles] = useState([]); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const API = "http://localhost:8080/admin";

  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    const previews = files.map((f) => URL.createObjectURL(f));
    setForm((prev) => ({ ...prev, images: previews }));
  };
  

  const handleArrayChange = (field, value) => {
    setForm({
      ...form,
      [field]: value.split(",").map((v) => v.trim()).filter(Boolean),
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      let uploadedUrls = form.images;
  
      if (imageFiles.length > 0) {
        const formData = new FormData();
        imageFiles.forEach((file) => formData.append("images", file));
  
        const uploadRes = await axios.post(
          "http://localhost:8080/image/uploadimage",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (uploadRes.data.ok) {
          uploadedUrls = uploadRes.data.urls; 
        } else {
          throw new Error("Upload failed");
        }
      }
  
      const carData = { ...form, images: uploadedUrls };
  
      // Gửi về API backend để lưu vào MongoDB
      await axios.post(`${API}/cars`, carData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      toast.success("Vehicle added successfully!");
      navigate("/admin/cars");
    } catch (err) {
      console.error("Error adding car:", err);
      toast.error("Add car failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100" responsive={Responsive}>
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
  <h2 className="text-3xl font-bold text-gray-800 mb-6">Add new car</h2>

  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 space-y-8">

    {/* Thông tin cơ bản */}
    <section>
      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-1">Basic information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Make</label>
          <input
            type="text"
            placeholder="VD: Toyota, Honda..."
            value={form.make}
            onChange={(e) => setForm({ ...form, make: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Model</label>
          <input
            type="text"
            placeholder="VD: Vios, Civic..."
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Generation</label>
          <input
            type="text"
            placeholder="VD: 2023, Gen 5..."
            value={form.generation}
            onChange={(e) => setForm({ ...form, generation: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Category</label>
          <input
            type="text"
            placeholder="VD: Sedan, SUV..."
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Transmission</label>
          <input
            type="text"
            placeholder="VD: Automatic, Manual"
            value={form.transmission}
            onChange={(e) => setForm({ ...form, transmission: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </section>

    {/* Giá & tính năng */}
    <section>
      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-1">Price & Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Price / day ($)</label>
          <input
            type="number"
            value={form.price_per_day.amount}
            onChange={(e) =>
              setForm({
                ...form,
                price_per_day: { ...form.price_per_day, amount: +e.target.value },
              })
            }
            placeholder="price"
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Deposit ($)</label>
          <input
            type="number"
            value={form.deposit}
            onChange={(e) => setForm({ ...form, deposit: +e.target.value })}
            placeholder="deposit"
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Seats</label>
          <input
            type="number"
            value={form.features.seats}
            onChange={(e) =>
              setForm({
                ...form,
                features: { ...form.features, seats: +e.target.value },
              })
            }
            placeholder="VD: 4, 5, 7..."
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Doors</label>
          <input
            type="number"
            value={form.features.doors}
            onChange={(e) =>
              setForm({
                ...form,
                features: { ...form.features, doors: +e.target.value },
              })
            }
            placeholder="VD: 2, 4..."
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </section>

    {/*Giấy tờ */}
    <section>
      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-1">Documents</h3>
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Verification document</label>
          <input
            type="text"
            value={form.documents.verification.join(", ")}
            onChange={(e) =>
              setForm({
                ...form,
                documents: { ...form.documents, verification: e.target.value.split(",") },
              })
            }
            placeholder="VD: CMND, Driver's license..."
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Mortgage documents</label>
          <input
            type="text"
            value={form.documents.mortgage.join(", ")}
            onChange={(e) =>
              setForm({
                ...form,
                documents: { ...form.documents, mortgage: e.target.value.split(",") },
              })
            }
            placeholder="VD: Household registration book..."
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Assets </label>
          <input
            type="text"
            value={form.documents.assets.join(", ")}
            onChange={(e) =>
              setForm({
                ...form,
                documents: { ...form.documents, assets: e.target.value.split(",") },
              })
            }
            placeholder="VD:15 million in cash..."
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </section>

    {/* Ảnh xe */}
    <section>
      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-1">Car photos</h3>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-3"
      />
      <div className="flex flex-wrap gap-3">
        {form.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="preview"
            className="w-32 h-20 object-cover rounded border"
          />
        ))}
      </div>
    </section>

    {/*  Mô tả & trạng thái */}
    <section className="grid grid-cols-1 gap-4">
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Car description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Enter detailed description..."
          className="w-full border border-gray-300 p-2 rounded h-24 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">Status</label>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
        >
          <option value="available">Available</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>
    </section>
  </div>

  <div className="mt-6 flex gap-3">
    <button
      onClick={handleSave}
      disabled={loading}
      className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
    >
      {loading ? "Saving..." : "Save"}
    </button>
    <button
      onClick={() => navigate("/admin/cars")}
      className="border px-6 py-2 rounded hover:bg-gray-100 transition"
    >
      Cancel
    </button>
  </div>
</main>

    </div>
  );
};

export default CarForm;
