// controllers/MomoPayController.js
import crypto from "crypto";
import axios from "axios";
import querystring from "querystring";
import MomoPayModel from "../model/MomoPay.js";
import BookingModel from "../model/Booking.js";
import  MomoConfig  from "../config/MomoConfig.js";
export const createPayment = async (req, res) => {
  try {
    const {
      amount,
      carId,
      pickup_location,
      pickup_date,
      pickup_time,
      return_date,
      return_time,
      days,
      hours,
      vat,
      deposit,
      total_price,
      paymentOption,
      userId,
    } = req.body;

    const orderId = `${Date.now()}`;
    const requestId = `${Date.now()}`;
    const requestType = "captureWallet";

    const extraData = JSON.stringify({
      carId,
      userId,
      bookingData: {
        pickup_location,
        pickup_date,
        pickup_time,
        return_date,
        return_time,
        days,
        hours,
        vat,
        deposit,
        total_price,
        paymentOption,
      },
    });

    const signatureRaw = `accessKey=${MomoConfig.accessKey}`
      + `&amount=${amount}`
      + `&extraData=${extraData}`
      + `&ipnUrl=${MomoConfig.ipnUrl}`
      + `&orderId=${orderId}`
      + `&orderInfo=Thanh toan dat xe`
      + `&partnerCode=${MomoConfig.partnerCode}`
      + `&redirectUrl=${MomoConfig.redirectUrl}`
      + `&requestId=${requestId}`
      + `&requestType=${requestType}`;

    const signature = crypto
      .createHmac("sha256", MomoConfig.secretKey)
      .update(signatureRaw)
      .digest("hex");

    const requestBody = {
      partnerCode: MomoConfig.partnerCode,
      accessKey: MomoConfig.accessKey,
      secretKey: MomoConfig.secretKey,
      requestId,
      amount,
      orderId,
      orderInfo: "Thanh toan dat xe",
      redirectUrl: MomoConfig.redirectUrl,
      ipnUrl: MomoConfig.ipnUrl,
      extraData,
      requestType,
      signature,
      lang: "vi",
    };

    const response = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      requestBody
    );

    if (response.data.resultCode === 0) {
      await MomoPayModel.create({
        orderId,
        requestId,        // 🔹 bắt buộc
        userId,
        carId,
        amount,
        paymentType: "MOMO", // 🔹 bắt buộc
        status: "PENDING",
      });
      
      return res.status(200).json({
        payUrl: response.data.payUrl,
        message: "Create MoMo payment success",
      });
    } else {
      return res.status(400).json({ message: "MoMo payment error" });
    }
  } catch (error) {
    console.error("MoMo Payment Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const handleMomoIPN = async (req, res) => {
  try {
    const { orderId, resultCode, extraData, transId } = req.body;

    // Tìm payment theo orderId
    const payment = await MomoPayModel.findOne({ orderId });
    if (!payment) return res.status(404).json({ message: "Payment not found!" });

    // Nếu thanh toán thành công
    if (resultCode === 0) {
      payment.status = "SUCCESS";
      payment.transactionId = transId;
      await payment.save();

      const { carId, userId, bookingData, bookingId } = JSON.parse(extraData);

      // Xác định trạng thái booking dựa vào paymentOption
      const status =
        bookingData.paymentOption === "traTruoc" ? "completed" : "reserved";

      // Cập nhật booking đã tạo trước khi thanh toán (trả sau) hoặc tạo mới
      if (bookingId) {
        await BookingModel.findByIdAndUpdate(bookingId, {
          status,
          subOption: "MOMO",
        });
      } else {
        await BookingModel.create({
          carId,
          customer: userId,
          ...bookingData,
          subOption: "MOMO",
          status,
        });
      }

      return res.status(200).json({ message: "Payment and booking success!" });
    } else {
      payment.status = "FAILED";
      await payment.save();
      return res.status(400).json({ message: "Payment failed or canceled" });
    }
  } catch (error) {
    console.error("IPN Handler Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
