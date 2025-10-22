import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
    pickup_location: String,
    pickup_date: { type: Date, required: true },
    return_date: { type: Date, required: true },
    pickup_time: String,
    return_time: String,
    days: Number,
    hours: Number,
    vat: Number,
    deposit: Number,
    total_price: Number,
    paymentOption: { type: String, enum: ["traTruoc", "traSau"], default: "traSau" },
    subOption: String, // ATM, VISA, VNPAY, ...
    status: { type: String, enum: ["reserved", "completed", "cancelled"], default: "reserved" },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("Booking", bookingSchema);
export default BookingModel;
