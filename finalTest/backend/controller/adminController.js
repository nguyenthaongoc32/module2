

// controllers/adminController.js
import BookingModel from "../model/Booking.js";
import CarModel from "../model/Car.js";
import AuthModel from "../model/Auth.js";
import mongoose from "mongoose";

export const getDashboard = async (req, res) => {
  try {
    // Tổng số lượng
    const totalUsers = await AuthModel.countDocuments({ role: "user" });
    const totalCars = await CarModel.countDocuments();
    const totalBookings = await BookingModel.countDocuments();

    // Doanh thu theo tháng (12 tháng gần nhất)
    const monthlyRevenue = await BookingModel.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$total_price" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    // Phương thức thanh toán phổ biến
    const paymentStats = await BookingModel.aggregate([
      {
        $group: {
          _id: "$paymentOption",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.json({
      ok: true,
      data: {
        totalUsers,
        totalCars,
        totalBookings,
        monthlyRevenue,
        paymentStats,
      },
    });
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    res.status(500).json({ ok: false, message: error.message });
  }
};

// User
export const getUser = async (req, res) => {
  try {
    const users = await AuthModel.find({ role: "user" }).select("-password");
    res.status(200).json({ ok: true, data: users });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const removed = await AuthModel.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ ok: false, message: "User not found" });
    // optional: also remove user's bookings or mark them cancelled
    await BookingModel.updateMany({ customer: removed._id, status: "reserved" }, { status: "cancelled" });
    res.status(200).json({ ok: true, message: "User removed" });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// Car
export const getCars = async (req, res) => {
  try {
    const cars = await CarModel.find();
    res.status(200).json({ ok: true, data: cars });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};
export const getCarById = async (req, res) => {
  try {
    const car = await CarModel.findById(req.params.id);
    if (!car) return res.status(404).json({ ok: false, message: "Car not found" });
    res.status(200).json({ ok: true, data: car });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

export const createCar = async (req, res) => {
  try {
    // Expected body: make, model, generation, category, transmission, features, price_per_day, deposit, images, description, limit
    const payload = req.body;
    const newCar = await CarModel.create(payload);
    res.status(201).json({ ok: true, data: newCar });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

export const updateCar = async (req, res) => {
  try {
    const updated = await CarModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ ok: false, message: "Car not found" });
    res.status(200).json({ ok: true, data: updated });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const deleted = await CarModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ ok: false, message: "Car not found" });
    // optional: also cancel related reservations
    await BookingModel.updateMany({ carId: deleted._id, status: "reserved" }, { status: "cancelled" });
    res.status(200).json({ ok: true, message: "Car deleted" });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

//Booking
export const getBookings = async (req, res) => {
  try {
    const q = req.query; // you can support filters e.g. status, customerId, date range
    const filter = {};
    if (q.status) filter.status = q.status;
    if (q.customer) filter.customer = q.customer;
    if (q.carId) filter.carId = q.carId;

    const bookings = await BookingModel.find(filter)
      .populate("carId", "make model images price_per_day deposit")
      .populate("customer", "firstName lastName email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({ ok: true, data: bookings });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body; // expected: "reserved" | "completed" | "cancelled"
    const booking = await BookingModel.findById(req.params.id);
    if (!booking) return res.status(404).json({ ok: false, message: "Booking not found" });

    booking.status = status;
    // if completed => free car (set car.status = available), if cancelled => free car too
    await booking.save();

    if (status === "completed" || status === "cancelled") {
      await CarModel.findByIdAndUpdate(booking.carId, { status: "available" });
    }

    res.status(200).json({ ok: true, data: booking });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};
export const deleteBooking = async (req, res) => {
  try {
    const removed = await BookingModel.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ ok: false, message: "Booking not found" });
    // free up car if needed
    await CarModel.findByIdAndUpdate(removed.carId, { status: "available" });
    res.status(200).json({ ok: true, message: "Booking removed" });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};
export const getPayments = async (req, res) => {
  try {
    const payments = await BookingModel.find()
      .populate("customer", "firstName lastName email")
      .populate("carId", "make model")
      .sort({ createdAt: -1 });

    res.status(200).json({ ok: true, data: payments });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};