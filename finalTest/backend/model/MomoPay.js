import mongoose from "mongoose";

const momoPaySchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true }, 
  requestId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "auth" }, 
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car" }, 
  amount: { type: Number, required: true }, 
  paymentType: { type: String, enum: ["MOMO"], required: true },
  status: { type: String, enum: ["PENDING", "SUCCESS", "FAILED"], default: "PENDING" }, 
  transactionId: { type: String }, 
  createdAt: { type: Date, default: Date.now },
});

const MomoPayModel = mongoose.model("payments", momoPaySchema);
export default MomoPayModel;
