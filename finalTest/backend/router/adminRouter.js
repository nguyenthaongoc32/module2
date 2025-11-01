import express from "express"
import {getUser, getDashboard, getCars,getPayments,getCarById,createCar,updateCar ,deleteUser,deleteCar,deleteBooking ,getBookings,updateBookingStatus} from "../controller/adminController.js"
import authToken  from "../middleware/checkAuthToken.js"
import adminOnly from "../middleware/checkAdminToken.js"
const Router = express.Router()

Router.route("/dashboard").get(authToken,adminOnly,getDashboard)
// Quản lý user
Router.route("/getusers").get(authToken,adminOnly,getUser)
Router.route("/deleteusers/:id").delete(authToken,adminOnly,deleteUser)
// Quản lý xe
Router.route("/getCars").get(authToken,adminOnly,getCars)
Router.route("/getCar/:id").get(authToken,adminOnly,getCarById)
Router.route("/cars").post(authToken,adminOnly,createCar)
Router.route("/putCar/:id").put(authToken,adminOnly,updateCar)
Router.route("/deleteCar/:id").delete(authToken,adminOnly,deleteCar)
// Booking
Router.route("/getPayments").get(authToken,adminOnly,getPayments)
Router.route("/booking/:id/status").put(authToken,adminOnly,updateBookingStatus)
Router.route("/getBooking").get(authToken,adminOnly,getBookings)
Router.route("/booking/:id").delete(authToken,adminOnly,deleteBooking)
export default Router