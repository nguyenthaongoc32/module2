import crypto from "crypto";
import axios from "axios";
import MomoPayModel from "../model/MomoPay.js";
import MomoConfig from "../config/MomoConfig.js";

export const createPayment = async (req, res) => {
  try {
    const { amount, orderInfo, userId, carId, bookingId, paymentOption } = req.body;

    if (!amount || !userId || !carId || !bookingId) {
      return res.status(400).json({ message: "Missing payment information!" });
    }


let finalAmount = amount;


if (paymentOption === "traSau") {
  finalAmount = Math.round(amount); 
}


else if (paymentOption === "traTruoc") {
  finalAmount = Math.round(amount * 0.95); 
}
    const amountVND = Math.round(finalAmount );

    if (amountVND < 1000 || amountVND > 50000000) {
      return res.status(400).json({
        message: "Transaction amount must be from 1,000 VND to 50,000,000 VND.",
        amountVND,
      });
    }

    const requestId = `${MomoConfig.partnerCode}_${Date.now()}`;
    const orderId = requestId;

    const redirectUrlWithBookingId = `${MomoConfig.redirectUrl}?bookingId=${bookingId}`;
    const extraData = JSON.stringify({ carId, bookingId });


    const rawSignature =
      `accessKey=${MomoConfig.accessKey}` +
      `&amount=${amountVND}` +
      `&extraData=${extraData}` +
      `&ipnUrl=${MomoConfig.ipnUrl}` +
      `&orderId=${orderId}` +
      `&orderInfo=${orderInfo}` +
      `&partnerCode=${MomoConfig.partnerCode}` +
      `&redirectUrl=${redirectUrlWithBookingId}` + 
      `&requestId=${requestId}` +
      `&requestType=captureWallet`;

    const signature = crypto
      .createHmac("sha256", MomoConfig.secretKey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = {
      partnerCode: MomoConfig.partnerCode,
      accessKey: MomoConfig.accessKey,
      requestId,
      amount: String(amountVND),
      orderId,
      orderInfo,
      redirectUrl: redirectUrlWithBookingId,
      ipnUrl: MomoConfig.ipnUrl,
      requestType: "captureWallet",
      extraData,
      signature,
      lang: "vi",
    };

    console.log("✅ rawSignature:", rawSignature);
    console.log("✅ signature:", signature);

    const momoResponse = await axios.post(MomoConfig.endpoint, requestBody, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("💬 Momo resp:", momoResponse.data);

    if (momoResponse.data && momoResponse.data.payUrl) {
      await MomoPayModel.create({
        orderId,
        requestId,
        userId,
        bookingId,
        amount: amountVND,
        paymentType: "MOMO",
        status: "PENDING",
      });

      return res.json({
        message: "Create payment successfully",
        payUrl: momoResponse.data.payUrl,
        depositVND: amountVND,
      });
    } else {
      return res.status(500).json({
        message: "Payment failed",
        data: momoResponse.data,
      });
    }
  } catch (error) {
    console.error("Payment error:", error.response?.data || error.message);
    return res.status(500).json({
      message: "Payment failed. Please try again.",
      error: error.response?.data || error.message,
    });
  }
};
