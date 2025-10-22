import express from "express"; 

import { searchCar , createBooking, calcPrice, getMyBookings,cancle } from "../controller/bookingController.js";

import authToken from "../middleware/checkAuthToken.js";

const Router = express.Router();

Router.route("/searchCar").get(searchCar);
Router.route("/calcPrice").post(calcPrice)
Router.route("/createBooking").post(createBooking);
Router.route("/getMyBookings").get(authToken, getMyBookings)
Router.route("/cancle/:id").put(cancle)
export default Router;