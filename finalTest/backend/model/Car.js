import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  generation: { type: String },
  category: { type: String },             
  transmission: { type: String },
  features: {
    seats: Number,
    doors: Number,
    ac: Boolean
  },
  documents: {                                    // Thủ tục giấy tờ
    verification: [String],                       // ["CMND", "Bằng lái"]
    mortgage: [String],                           // ["Sổ hộ khẩu"]
    assets: [String]                              // ["15 triệu tiền mặt", ...]
  },
  payment: [String], 
  price_per_day: {
    amount: Number,
    currency: { type: String, default: "$" }
  },
  deposit : Number,
  images: [String],
  description: { type: String }, 
  limit: {
      distancePerDay: Number ,
      extraFee : Number,
    },
  status: { type: String, enum: ["available", "maintenance"], default: "available" },
  available_from: Date,
  available_start_time: String, // HH:mm
  available_end_time: String 
}, { timestamps: true });

const CarModel = mongoose.model("Car", carSchema);

export default CarModel
