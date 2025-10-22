import express from "express";
import { createPayment} from "../controller/MomoPayController.js";


const Router = express.Router();

Router.route("/createPayment").post(createPayment);

export default Router;
