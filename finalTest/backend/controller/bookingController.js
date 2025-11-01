import BookingModel from "../model/Booking.js";
import CarModel from "../model/Car.js";
import { calculatePrice } from "./calculatePrice.js";

// Search car
export const searchCar = async (req, res) => {
  try {
    const { pickup_date, return_date, pickup_time, return_time } = req.query;

    const pickupDateTime = new Date(`${pickup_date}T${pickup_time}`);
    const returnDateTime = new Date(`${return_date}T${return_time}`);

    // Lấy danh sách xe đang bị trùng booking
    const bookedCars = await BookingModel.find({
      status: { $ne: "cancelled" },
      $or: [
        {
          pickup_date: { $lte: returnDateTime },
          return_date: { $gte: pickupDateTime },
        },
      ],
    }).distinct("carId");

    // Lấy xe KHÔNG nằm trong bookedCars
    const availableCars = await CarModel.find({
      _id: { $nin: bookedCars },
      status: "available", 
    });

    res.status(200).json({ ok: true, data: availableCars });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ ok: false, message: error.message });
  }
};


// Create booking
export const createBooking = async (req, res) => {
  try {
    const {
      carId,
      pickup_location,
      pickup_date,
      return_date,
      pickup_time,
      return_time,
      paymentOption,
      subOption,
    } = req.body;

    const customer = req.userId;

    const car = await CarModel.findById(carId);
    if (!car) return res.status(404).json({ ok: false, message: "Car not found" });

    // Tính giá
    const priceData = calculatePrice(
      car,
      pickup_date,
      return_date,
      pickup_time,
      return_time,
      paymentOption
    );

    // Tạo booking
    const booking = new BookingModel({
      carId,
      customer,
      pickup_location,
      pickup_date,
      return_date,
      pickup_time,
      return_time,
      ...priceData,
      paymentOption,
      subOption,
    });

    await booking.save();

    // Cập nhật trạng thái xe nếu muốn
    car.status = "maintenance";
    await car.save();

    res.json({ ok: true, data: booking });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

// API tính giá trước khi đặt
export const calcPrice = async (req, res) => {
  try {
    const { carId, pickup_date, return_date, pickup_time, return_time, paymentOption } = req.body;

    const car = await CarModel.findById(carId);
    if (!car) return res.status(404).json({ ok: false, error: "Car not found" });

    const result = calculatePrice(
      car,
      pickup_date,
      return_date,
      pickup_time,
      return_time,
      paymentOption
    );

    res.json({ ok: true, data: result });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

// Lấy lịch sử đặt xe của user
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.userId; // lấy từ middleware checkAuthToken
    if (!userId) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }

    const bookings = await BookingModel.find({ customer: userId })
      .populate("carId", "make model images price_per_day deposit")
      .sort({ createdAt: -1 });

    res.status(200).json({ ok: true, data: bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ ok: false, message: "Server error" });
  }
};


export const cancle = async (req, res) =>{
  try {
    const booking = await BookingModel.findById(req.params.id);
    if (!booking)
      return res.status(404).json({ ok: false, message: "Order not found" });

    // Chỉ cho phép hủy nếu trạng thái hiện tại là reserved
    if (booking.status !== "reserved")
      return res
        .status(400)
        .json({ ok: false, message: "This order cannot be cancelled." });

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ ok: true, message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ ok: false, message: "Error when canceling order" });
  }
}
// Lấy danh sách lịch đã được đặt của 1 xe
export const getBookingsByCarId = async (req, res) => {
  try {
    const carId = req.params.carId;

    const bookings = await BookingModel.find({
      carId,
      status: { $ne: "cancelled" } // không lấy lịch bị hủy
    }).select("pickup_date pickup_time return_date return_time -_id"); // chỉ lấy những trường cần

    if (!bookings.length) {
      return res.status(200).json({ ok: true, message: "No bookings found for this car", bookings: [] });
    }

    return res.status(200).json({ ok: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings by carId:", error);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};


