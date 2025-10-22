import BookingModel from "../model/Booking.js";
import CarModel from "../model/Car.js";
import { calculatePrice } from "./calculatePrice.js";

// Search car
export const searchCar = async (req, res) => {
  try {
    const { pickup_date, return_date } = req.query;
    let filter = { status: "available" };

    const cars = await CarModel.find(filter);
    res.json({ success: true, cars });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create booking
export const createBooking = async (req, res) => {
  try {
    const {
      carId,
      customer,
      pickup_location,
      pickup_date,
      return_date,
      pickup_time,
      return_time,
      paymentOption,
      subOption,
    } = req.body;

    const car = await CarModel.findById(carId);
    if (!car) return res.status(404).json({ ok: false, error: "Car not found" });

    // Tính giá
    const priceData = calculatePrice(
      car,
      pickup_date,
      return_date,
      pickup_time,
      return_time,
      paymentOption
    );

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

    // update car status
    car.status = "maintenance";
    await car.save();

    res.json({ ok: true, data: booking });
  } catch (error) {
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
      return res.status(404).json({ ok: false, message: "Không tìm thấy đơn đặt" });

    // Chỉ cho phép hủy nếu trạng thái hiện tại là reserved
    if (booking.status !== "reserved")
      return res
        .status(400)
        .json({ ok: false, message: "Đơn này không thể hủy" });

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ ok: true, message: "Đã hủy đơn thành công" });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ ok: false, message: "Lỗi khi hủy đơn" });
  }
}


