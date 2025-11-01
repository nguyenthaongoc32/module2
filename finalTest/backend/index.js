import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from "./router/authRouter.js";
import carRouter from"./router/carRouter.js";
import cors from "cors";
import imageRouter from "./router/imageRouter.js";
import bookingRouter from "./router/bookingRouter.js";
import momoPaymentRouter from "./router/momoPayment.js"
import adminRouter from "./router/adminRouter.js"
dotenv.config();

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

app.use(express.json());


app.use("/api/auth", authRouter)
app.use("/image", imageRouter)
app.use("/api/car",carRouter)
app.use("/api/booking",bookingRouter)
app.use("/api/momo",momoPaymentRouter)
app.use("/admin" , adminRouter)
app.listen(8080, () => {
    console.log('Server is running!');
});





