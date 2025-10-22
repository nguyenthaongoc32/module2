import express from "express";
import { login, register, getUser,updateUser, changePassword ,  } from "../controller/authController.js";
import authToken from "../middleware/checkAuthToken.js";

const Router = express.Router()

Router.route("/register").post(register)
Router.route("/login").post(login)
Router.route("/getUser").get(authToken,getUser)
Router.route("/updateUser/:id").put(updateUser)
Router.route("/changePassword/:id").put(changePassword)
export default Router